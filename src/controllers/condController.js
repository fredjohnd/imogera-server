// const User = require('../models/user')

exports.cond_list = function(req, res) {
  res.send('Condominio list');
};

exports.cond_add = function(req, res) {
  res.send('Condominio add');
};

exports.cond_delete = function(req, res) {
  res.send('Condominio delete');
};

exports.cond_detail = function(req, res) {
  res.send(`Condominio: ${req.params.id}`);
};
