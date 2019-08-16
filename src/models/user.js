const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const { schema } = User;
if (!schema.options.toJSON) schema.options.toJSON = {};
schema.options.toJSON.transform = function(doc, ret, options) {
  /* eslint-disable no-underscore-dangle */
  const data = ret;
  delete data.__v;

  if (!options.includePassword) {
    delete data.password;
  }

  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete data[prop];
    });
  }

  return data;
};
module.exports = User;
