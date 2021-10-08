const db = require('../db.js');

exports.get = async (req, res) => {
    try {
        const result = await db.pool.query('SELECT * FROM Categories');
        res.send(result);
    } catch (err) {
        throw err;
    }
};

exports.post = async (req, res) => {
    try {
        const result = await db.pool.query('INSERT INTO Categories (Name, Description) VALUES (?, ?)', [req.body.Name, req.body.Description]);
        res.send(result);
    } catch (err) {
        throw err;
    }
};
