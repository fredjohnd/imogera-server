const HttpStatus = require('http-status-codes');
const Condominio = require('../models/condominio');
const moment = require('moment');
moment.locale('pt-pt');

exports.condominio_list = async function (req, res) {

  try {
    const docs = await Condominio.find({ owner: req.user.id });
    return res.send(docs.map(d => d.toJSON({ hide: 'owner' })));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }

};

exports.condominio_add = async function (req, res) {
  const condominio = new Condominio(req.body);

  condominio.owner = req.user.id;
  condominio.created_at = moment().toISOString();

  try {
    await condominio.save();
    return res.send(condominio.toJSON({ hide: 'owner' }));
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send(e);
  }

};

//todo: proper json error message
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

//todo: proper json error message
exports.condominio_detail = async function (req, res) {
  const { id } = req.params;

  try {
    const doc = await Condominio.findById(id);
    if (!doc) return res.status(HttpStatus.NOT_FOUND).send();

    return res.send(doc.toJSON({ hide: 'owner' }));
  } catch (error) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .send('Condominio not found or no permission.');
  }
};
