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

exports.condominio_delete = async function(req, res) {
  const { id } = req.params;

  try {
    const doc = await Condominio.findByIdAndDelete(id);
    if (!doc) return res.status(HttpStatus.NOT_FOUND).send();

    return res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send('Condominio not found');
  }
};

exports.condominio_detail = async function(req, res) {
  const { id } = req.params;

  try {
    const doc = await Condominio.findById(id);
    if (!doc) return res.status(HttpStatus.NOT_FOUND).send();
    return res.send(doc);
  } catch (error) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .send('Condominio not found or no permission.');
  }
};
