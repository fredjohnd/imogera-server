const HttpStatus = require('http-status-codes');
const Condominio = require('../models/condominio');

exports.condominio_list = async function(req, res) {
  Condominio.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    });
};

exports.condominio_add = function(req, res) {
  const condominio = new Condominio(req.body);

  condominio
    .save()
    .then(() => {
      res.send(condominio);
    })
    .catch((e) => {
      res.status(HttpStatus.BAD_REQUEST).send(e);
    });
};

exports.condominio_delete = function(req, res) {
  const { id } = req.params;

  Condominio.findByIdAndDelete(id)
    .then(() => {
      res.status(HttpStatus.NO_CONTENT).send();
    })
    .catch((e) => {
      res.status(HttpStatus.BAD_REQUEST).send('Condominio not found');
    });
};

exports.condominio_detail = function(req, res) {
  const { id } = req.params;

  Condominio.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(HttpStatus.NOT_FOUND).send();
      }

      return res.send(data);
    })
    .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send());
};
