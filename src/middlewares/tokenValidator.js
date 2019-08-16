const jwt = require('jsonwebtoken');

const PUBLIC_ENDPOINTS = ['/account/login', '/account/register'];

module.exports = (req, res, next) => {
  // Do not validate endpoints that do not require auth
  if (PUBLIC_ENDPOINTS.indexOf(req.originalUrl) !== -1) return next();

  try {
    const token = req.headers.authorization.split(' ')[1];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ error: true, message: 'Unauthorized access.' });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        error: true,
        message: 'No token provided.',
      });
    }
  } catch (error) {
    return res.status(403).send({
      error: true,
      message: 'No token provided.',
    });
  }
};
