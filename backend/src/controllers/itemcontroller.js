const db = require('../db.js');

exports.get = async (req, res) => {
    try {
        const result = await db.pool.query('SELECT i.ID, i.Name, i.Description, c.Name as CategoryName FROM Items as i LEFT JOIN Categories as c ON i.Categories = c.ID');
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

exports.getID = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await db.pool.query(
            'SELECT i.ID, i.Name, i.Description, c.Name as CategoryName FROM Items as i LEFT JOIN Categories as c ON i.Categories = c.ID WHERE i.ID = ?',
            [id]
        );
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

exports.post = async (req, res) => {
    const catagoryID = req.body.CatagoryID;
    const name = req.body.Name;
    const description = req.body.Description;

    try {
        const category = await db.pool.query('SELECT ID FROM Categories WHERE ID = ?', [catagoryID]);
        if (category.length === 0) {
            return res.status(400).send('Category not found');
        }

        const result = await db.pool.query('INSERT INTO Items (Name, Description, Categories) VALUES (?, ?, ?)', [name, description, catagoryID]);

        return res.status(201).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};
