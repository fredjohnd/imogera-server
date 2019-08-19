const User = require('../models/user');

const fetchAllUsers = () => {
  return User.find({});
}
const fetchUserById = (id) => {
  return User.findById(id);
}


module.exports = {
  fetchUserById,
  fetchAllUsers
};
