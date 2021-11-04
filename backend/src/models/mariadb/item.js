const db = require('../../db.js');

exports.getAll = async () => {
    return await db.pool.query('SELECT i.ID, i.Name, i.Description, i.CheckStatus, c.Name as CategoryName FROM Items as i LEFT JOIN Categories as c ON i.Categories = c.ID');
};

exports.getByID = async (id) => {
    let result = await db.pool.query(
        'SELECT i.ID, i.Name, i.Description, i.CheckStatus, c.ID as CategoryID, c.Name as CategoryName FROM Items as i LEFT JOIN Categories as c ON i.Categories = c.ID WHERE i.ID = ?',
        [id]
    );

    return result[0];
};

exports.update = async (itemId, prop, value) => {
    return await db.pool.query('UPDATE Items SET ' + prop + '=? WHERE ID=?', [value, itemId]);
};

exports.create = async (name, description, catagoryID) => {
    return await db.pool.query('INSERT INTO Items (Name, Description, Categories) VALUES (?, ?, ?)', [name, description, catagoryID]);
};

exports.exits = async (id) => {
    let result = await db.pool.query('SELECT ID FROM Items WHERE ID = ?', [id]);
    if (result.length == 0) return false;
    return true;
};
