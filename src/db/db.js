const mongoose = require('mongoose');

// Connection URL
const user = 'devdev';
const pass = 'rweuhg9fe08';
const connectionUrl = `mongodb://${user}:${pass}@ds263127.mlab.com:63127/heroku_qf7r2ppc`;

mongoose.connect(connectionUrl, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected');
});
