const db = require('../../db.js');

exports.getAll = async () => {
    return await db.pool.query('SELECT * FROM Categories');
};

exports.create = async (name, description) => {
    return await db.pool.query('INSERT INTO Categories (Name, Description) VALUES (?, ?)', [name, description]);
};

exports.exits = async (id) => {
    let result = await db.pool.query('SELECT ID FROM Categories WHERE ID = ?', [id]);
    if (result.length == 0) return false;
    return true;
};
