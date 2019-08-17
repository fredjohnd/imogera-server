const mongoose = require('mongoose');

// Connection URL
const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const connectionUrl = `mongodb://${user}:${pass}@${dbHost}/${dbName}`;

mongoose.connect(connectionUrl, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected');
});
