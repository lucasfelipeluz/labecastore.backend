const connection = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'lucas2012',
    database: 'labeca',
  },
});

module.exports = connection;
