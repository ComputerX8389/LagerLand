const db = require('../db.js');

exports.get = async (req, res) => {
    try {
        const result = await db.pool.query(`
            SELECT sc.ScanTime,
            it.CheckStatus,
            us.ID as UserID,
            us.FullName,
            us.Username,
            us.Email,
            it.ID as ItemID,
            it.Name as ItemName,
            ga.ID as GategoryID,
            ga.Name as GategoryName
            FROM Scans as sc
            JOIN Users as us ON sc.User = us.ID
            JOIN Items as it ON sc.Item = it.ID
            JOIN Categories as ga ON it.Categories = ga.ID`);

        result.forEach((element) => {
            element.CheckStatus = Boolean(element.CheckStatus);
        });
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};

exports.post = async (req, res) => {
    const itemID = req.body.ItemID;

    try {
        let token = req.headers['x-access-token'];

        const user = await db.pool.query('SELECT ID FROM Users WHERE Token = ?', [token]);
        const item = await db.pool.query('SELECT ID, CheckStatus FROM Items WHERE ID = ?', [itemID]);
        let checkStatus = item[0].CheckStatus;

        if (item.length === 0) {
            return res.status(400).json('Item not found');
        }
        if (user.length === 0) {
            return res.status(400).json('User not found');
        }
        const userID = user[0].ID;
        const DateTime = new Date();

        const scanin = await db.pool.query('INSERT INTO Scans (User, Item, ScanTime) VALUES (?, ?, ?)', [userID, itemID, DateTime]);
        const itemup = await db.pool.query('UPDATE Items SET CheckStatus=? WHERE ID=?', [!checkStatus, userID]);

        return res.status(201).json({ Scan: scanin, Item: itemup });
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }
};
