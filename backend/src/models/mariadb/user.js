const db = require('../../db.js');

exports.getByUsername = async (username) => {
    let result = await db.pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    return result[0];
};

exports.getByToken = async (token) => {
    let result = await db.pool.query('SELECT * FROM Users WHERE Token = ?', [token]);
    return result[0];
};

exports.create = async (username, hashedPassword, fullname, email) => {
    return await db.pool.query('INSERT INTO Users (Username, Password, FullName, Email) VALUES (?, ?, ?, ?)', [username, hashedPassword, fullname, email]);
};

exports.update = async (userId, prop, value) => {
    return await db.pool.query('UPDATE Users SET ' + prop + '=? WHERE ID=?', [value, userId]);
};
