const mongodb = require('mongodb');

const { MongoClient } = mongodb;

// Connection URL
const dbName = 'heroku_qf7r2ppc';
const user = 'devdev';
const pass = 'rweuhg9fe08';
const connectionUrl = `mongodb://${user}:${pass}@ds263127.mlab.com:63127/heroku_qf7r2ppc`;

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async (error, client) => {
    if (error) {
      throw Error('Unable to connect to database');
    }

    const db = client.db(dbName);

    const data = await db
      .collection('users')
      .find({ age: 24 })
      .limit(1)
      .toArray();

    console.log(data);
  },
);
