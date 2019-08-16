const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWTToken = function(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      return resolve(decodedToken);
    });
  });
};

/* eslint-disable no-param-reassign */
const createJWToken = function(details) {
  if (typeof details !== 'object') {
    details = {};
  }

  const token = jwt.sign(
    {
      data: details.sessionData,
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS512',
      expiresIn: '7d',
    },
  );

  return token;
};

module.exports = { verifyJWTToken, createJWToken };
