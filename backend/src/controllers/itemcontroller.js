const db = require('../db.js');

exports.get = async (req, res) => {
    try {
        const result = await db.pool.query('select * from Items');
        res.send(result);
    } catch (err) {
        throw err;
    }
};

exports.post = async (req, res) => {
    try {
        const result = await db.pool.query('insert into Items set Name=?', req.body.Name);
        res.send(result);
    } catch (err) {
        throw err;
    }
};
