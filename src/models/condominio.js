const mongoose = require('mongoose');

const Condominio = mongoose.model('Condominio', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  number_members: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },

  created_at: {
    type: String,
    required: true
  }
});

// Removes __v property and any properties passed in options.hide
const { schema } = Condominio;
if (!schema.options.toJSON) schema.options.toJSON = {};
schema.options.toJSON.transform = function (doc, ret, options) {
  /* eslint-disable no-underscore-dangle */
  const data = ret;
  delete data.__v;

  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete data[prop];
    });
  }

  return data;
};

module.exports = Condominio;
