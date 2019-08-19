module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('X-Requested-With');
  res.header('X-HTTP-Method-Override');
  res.header('Content-Type');
  res.header('Accept');
  res.header("Access-Control-Expose-Headers", "X-Token");
  // intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    //move on
    next();
  }
};
