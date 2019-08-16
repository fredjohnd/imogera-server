const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

const userNameExists = async function(username) {
  return User.findOne({ username }).countDocuments();
};

const emailAddressExists = async function(email) {
  return User.findOne({ email }).countDocuments();
};

const register = async function(req, res) {
  const { name, username, password, email } = req.body;

  const userExists = await userNameExists(username);
  if (userExists) return res.send('Username already exists');

  const emailExists = await emailAddressExists(email);
  if (emailExists) {
    return res.send(
      'Email already registered. Please login or click forgot Password',
    );
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, username, email, password: hash });
    await user.save();
    return res.send(user);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

const login = async function(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.send('No user found');

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) return res.send(user);

    return res.send('Invalid username/password');
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};

const logout = function(req, res) {
  res.send('Not Implemented Logout');
};

const confirm = function(req, res) {
  res.send('Not Implemented Confirm');
};

module.exports = { register, login, logout, confirm };
