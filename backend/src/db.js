// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');

// Create a connection pool
var pool = mariadb.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'lagerland',
    connectionLimit: 5,
});

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
    pool: pool,
});
