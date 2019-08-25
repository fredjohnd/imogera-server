const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
const Incident = mongoose.model('Incident', {

  name: {
    type: String,
    required: true,
    trim: true,
  },

  parent_id: {
    type: ObjectId,
    required: true,
    trim: true,
  },

  author_id: {
    type: ObjectId,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  created_at: {
    type: String,
    required: true
  }
});

// Removes __v property and any properties passed in options.hide
// const { schema } = Incident;
// if (!schema.options.toJSON) schema.options.toJSON = {};
// schema.options.toJSON.transform = function (doc, ret, options) {
//   /* eslint-disable no-underscore-dangle */
//   const data = ret;
//   delete data.__v;

//   if (options.hide) {
//     options.hide.split(' ').forEach((prop) => {
//       delete data[prop];
//     });
//   }

//   return data;
// };

module.exports = Incident;
