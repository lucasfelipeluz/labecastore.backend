/*  Método responsável por conectar ao Banco de dados
    MySQL. */
const database = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
  },
});

module.exports = database;
