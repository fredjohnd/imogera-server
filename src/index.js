const express = require('express');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const condRouter = require('./routes/cond');

require('./services/db');

const app = express();
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/cond', condRouter);

app.listen(process.env.PORT || 5000);
