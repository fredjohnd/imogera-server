const HttpStatus = require('http-status-codes');
const Condominio = require('../models/condominio');
const User = require('../models/user');
const moment = require('moment');
const incidentService = require('../services/incident-fetcher-service');
const userFetcherService = require('../services/user-fetcher-service');
const permissionService = require('../services/permission-asserter-service');
const { assertOwner } = require('../services/permission-asserter-service');
moment.locale('pt-pt');

exports.condominio_list = async function (req, res) {

  try {
    const docs = await Condominio.find({ owner_id: req.user.id });
    return res.send(docs.map(d => d.toJSON({ hide: 'owner_id' })));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }

};

exports.condominio_add = async function (req, res) {
  const condominio = new Condominio(req.body);

  condominio.owner_id = req.user.id;
  condominio.created_at = moment().toISOString();
  condominio.number_incidents = 0;

  try {
    await condominio.save();
    return res.send(condominio.toJSON({ hide: 'owner_id' }));
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send(e);
  }

};

exports.condominio_update = async function (req, res) {
  const { id } = req.params;

  try {
    const doc = await Condominio.findById(id);
    if (!doc) return res.status(HttpStatus.NOT_FOUND).send();
    assertOwner(doc, req.user);
    await Condominio.findOneAndUpdate({ _id: id }, req.body);
    return res.send(doc);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send('Condominio not found');
  }
};

exports.condominio_add_member = async function (req, res) {
  const { id } = req.params;
  try {

    // Get condominio and validate owner
    const cond = await Condominio.findById(id);
    assertOwner(cond, req.user);

    const { name, email, phone_number } = req.body;

    // Try fetching an account with supplied email address
    const user = await userFetcherService.fetchUserByEmail(email);

    // If there is an account use its Id
    if (user) {

      // Add user to condominio
      const userId = user.id;

      const alreadyAdded = cond.members_ids.find(id => userId);
      if (alreadyAdded) {
        return res.send();
      }

      cond.members_ids.push(userId);
      await cond.save();

      // Add condominio to user
      user.member_of.push(cond.id);
      await user.save();

      const docMembers = await userFetcherService.fetchMultipleUsersById(cond.members_ids);
      cond.members = docMembers;
      const data = {
        model: cond.toJSON({ hide: 'owner_id' }),
        members: docMembers
      };

      return res.send(data);

    } else {
      const newUser = new User({
        name,
        email,
        phone_number,
        member_of: [id] // Add them to this condominio
      });

      await newUser.save();
      cond.members_ids.push(newUser.id);
      await cond.save();

      const docMembers = await userFetcherService.fetchMultipleUsersById(cond.members_ids);
      cond.members = docMembers;
      const data = {
        model: cond.toJSON({ hide: 'owner_id' }),
        members: docMembers
      };
      return res.send(data);

    }
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send(error);
  }
}

//todo: proper json error message
//todo: check if object belongs to user
exports.condominio_delete = async function (req, res) {
  const { id } = req.params;

  try {
    const doc = await Condominio.findByIdAndDelete(id);
    if (!doc) return res.status(HttpStatus.NOT_FOUND).send();

    return res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send('Condominio not found');
  }
};

//todo: check if object belongs to user
//todo: proper json error message
exports.condominio_detail = async function (req, res) {
  const { id } = req.params;

  try {
    const doc = await Condominio.findById(id);
    permissionService.assertOwner(doc, req.user);

    if (!doc) return res.status(HttpStatus.NOT_FOUND).send();

    const docMembers = await userFetcherService.fetchMultipleUsersById(doc.members_ids);
    doc.members = docMembers;
    const data = {
      model: doc.toJSON({ hide: 'owner_id' }),
      members: docMembers
    };
    return res.send(data);
  } catch (error) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .send('Condominio not found or no permission.');
  }
};

exports.condominio_add_incident = async function (req, res) {
  const data = req.body;

  try {
    const condominio = await Condominio.findById(req.params.id);
    const members = condominio.members_ids;
    permissionService.assertMember(members, req.user);
    if (condominio) {
      data.author_id = req.user.id;
      data.parent_id = req.params.id;
      data.created_at = moment().toISOString();
      const incident = await incidentService.addIncident(data);

      condominio.set('number_incidents', condominio.number_incidents + 1);
      await condominio.save();
      return res.send(incident);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).send('Condominio not found not add incident');
    }
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send(error);
  }
}
