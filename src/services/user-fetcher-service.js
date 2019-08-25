const User = require('../models/user');

const fetchAllUsers = () => {
  return User.find({});
}
const fetchUserById = (id) => {
  return User.findById(id);
}

const fetchUserByEmail = async (emailAddress) => {
  return User.findOne({ email: emailAddress.toLowerCase() });
}

const fetchMultipleUsersById = async (ids) => {
  return User.find({})
    .where('_id')
    .in(ids)
    .exec();
}

const emailAddressExists = async function (email) {
  return User.findOne({ email: email.toLowerCase() }).countDocuments();
};

module.exports = {
  fetchUserById,
  fetchAllUsers,
  fetchMultipleUsersById,
  fetchUserByEmail
};
