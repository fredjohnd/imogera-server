const express = require('express');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const accountRouter = require('./routes/account');
const condominioRouter = require('./routes/condominios');

require('./db/db');

const app = express();

app.use(require('./middlewares/headers'));

app.use(require('./middlewares/tokenValidator'));

app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/account', accountRouter);
app.use('/condominios', condominioRouter);

app.listen(process.env.PORT || 5000);
