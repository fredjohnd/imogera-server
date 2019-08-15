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
});

module.exports = Condominio;
