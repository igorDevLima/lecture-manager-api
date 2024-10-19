const mysql = require('mysql2/promise');

const host = process.env.MYSQL_HOST || 'localhost';
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const port = process.env.MYSQL_PORT || '3306';
const database = process.env.MYSQL_DB;

const connection = mysql.createPool({
  host: host,
  user: user,
  password: password,
  port: port,
  database: database,
});

module.exports = connection;
