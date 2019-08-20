module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, username, X-HTTP-Method-Override");

  res.header("Access-Control-Expose-Headers", "X-Token");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    //move on
    next();
  }
};
