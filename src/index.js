const express = require('express');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const condominioRouter = require('./routes/condominios');

require('./db/db');

const app = express();
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/condominios', condominioRouter);

app.listen(process.env.PORT || 5000);
