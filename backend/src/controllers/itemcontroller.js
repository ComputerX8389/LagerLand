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
        const category = await db.pool.query('SELECT ID FROM Categories WHERE Name = ?', [req.body.Catagory]);
        console.log('length:', category.length);

        if (category.length === 0) {
            res.status(404).send('Category not found');
            return;
        }

        const catagoryID = category[0]['ID'];
        const result = await db.pool.query('INSERT INTO Items (Name, Description, Categories) VALUES (?, ?, ?)', [req.body.Name, req.body.Description, catagoryID]);

        res.send(result);
        console.log('Item added', result);
    } catch (err) {
        console.log(err);

        res.status(500).send('Internal server error');
    }
};
