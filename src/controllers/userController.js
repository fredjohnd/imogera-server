// const User = require('../models/user');
// const db = require('../services/db');

exports.user_list = function(req, res) {
  res.send('User List');
};

exports.user_add = function(req, res) {
  res.send('User Add');
};

exports.user_delete = function(req, res) {
  res.send('User Delete');
};

exports.user_detail = function(req, res) {
  res.send(`User detail for: ${req.params.id}`);
};
