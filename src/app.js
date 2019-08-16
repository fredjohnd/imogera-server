const express = require('express');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const accountRouter = require('./routes/account');
const condominioRouter = require('./routes/condominios');

require('./db/db');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  );
  next();
});

app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);

app.use('/account', accountRouter);

app.use('/condominios', condominioRouter);

app.listen(process.env.PORT || 5000);
