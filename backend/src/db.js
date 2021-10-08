// Use the MariaDB Node.js Connector
const mariadb = require('mariadb');
const consts = require('./consts.js');

// Create a connection pool
var pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: consts.DB_NAME,
    connectionLimit: 5,
});

// Expose a method to establish connection with MariaDB
module.exports = Object.freeze({
    pool: pool,
});
