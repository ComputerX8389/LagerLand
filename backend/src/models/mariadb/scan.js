const db = require('../../db.js');

exports.getAll = async (limit) => {
    return await db.pool.query(
        `
        SELECT sc.ID as ScanID,
        sc.ScanTime,
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
        JOIN Categories as ga ON it.Categories = ga.ID
        ORDER BY sc.ScanTime DESC
        LIMIT ?`,
        [limit]
    );
};

exports.create = async (userID, itemID, DateTime) => {
    return await db.pool.query('INSERT INTO Scans (User, Item, ScanTime) VALUES (?, ?, ?)', [userID, itemID, DateTime]);
};
