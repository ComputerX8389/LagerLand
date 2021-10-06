const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    try {
        const result = await db.pool.query('select * from Items');
        res.send(result);
    } catch (err) {
        throw err;
    }
});

app.listen(port, () => {
    console.log(`Example app listening at port ${port}`);
});
