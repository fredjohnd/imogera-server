const HttpStatus = require('http-status-codes');
const User = require('../models/user');
const userFetcher = require('../services/user-fetcher-service');
exports.user_list = async function (req, res) {
  userFetcher.fetchAllUsers
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    });
};

exports.user_add = function (req, res) {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(() => {
      res.status(HttpStatus.BAD_REQUEST).send();
    });
};

exports.user_delete = function (req, res) {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then(() => {
      res.status(HttpStatus.OK).send('OK');
    })
    .catch(() => {
      res.status(HttpStatus.BAD_REQUEST).send();
    });
};

exports.user_detail = function (req, res) {
  const { id } = req.params;

  userFetcher.fetchUserById(id)
    .then((user) => {
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send();
      }

      return res.send(user);
    })
    .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send());
};
