const db = require('../db.js');

exports.get = async (req, res) => {
    try {
        const result = await db.pool.query('SELECT i.Name, i.Description, c.Name as CategoryName FROM Items as i LEFT JOIN Categories as c ON i.Categories = c.ID');
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
};

exports.post = async (req, res) => {
    try {
        const user = await db.pool.query('SELECT ID FROM Users WHERE Username = ?', [req.body.Username]);

        if (user.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        const userID = user[0]['ID'];
        const DateTime = new Date();

        const result = await db.pool.query('INSERT INTO Scans (User, Item, ScanTime) VALUES (?, ?, ?)', [userID, req.body.Item, DateTime]);

        res.send(result);
        console.log('Item added', result);
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal server error');
    }
};
