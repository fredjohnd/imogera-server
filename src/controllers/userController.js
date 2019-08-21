const HttpStatus = require('http-status-codes');
const User = require('../models/user');
const userFetcher = require('../services/user-fetcher-service');
exports.user_list = async function (req, res) {

  try {
    const users = await userFetcher.fetchAllUsers();
    res.send(users);

  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }

};

exports.user_add = async function (req, res) {

  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send();
  }
};

//todo: remove success message or send a proper formatted json
exports.user_delete = async function (req, res) {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(HttpStatus.OK).send('OK');
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send();
  }
};

exports.user_detail = async function (req, res) {
  const { id } = req.params;

  try {
    const user = await userFetcher.fetchUserById(id);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    return res.send(user);

  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
};
