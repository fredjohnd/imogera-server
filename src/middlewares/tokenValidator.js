const jwt = require('jsonwebtoken');

const PUBLIC_ENDPOINTS = ['/', '/account/login', '/account/register'];

module.exports = async (req, res, next) => {
  // Do not validate endpoints that do not require auth
  if (PUBLIC_ENDPOINTS.indexOf(req.path) !== -1) return next();

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(403).send({ error: true, message: 'No token provided.' });

    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: true, message: 'Unauthorized access.' });
      req.user = decoded.data;
      return next();
    });
  } catch (error) {
    return res.status(403).send({
      error: true,
      message: 'No token provided.',
    });
  }
};
