const User = require('../models/user');

const PUBLIC_ENDPOINTS = ['/', '/account/login', '/account/register'];

module.exports = async (req, res, next) => {
  // Do not validate endpoints that do not require auth
  if (PUBLIC_ENDPOINTS.indexOf(req.path) !== -1) return next();

  try {
    const username = req.headers['username'];
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .send('Header "username" not set or user not found in DB');
    }
    req.decoded = user;
    next();
  } catch (error) {
    return res.status(403).send({
      error: true,
      message: 'No token provided.',
    });
  }
};
