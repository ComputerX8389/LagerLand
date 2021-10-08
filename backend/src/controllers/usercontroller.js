const db = require('../db.js');

exports.auth = async (req, res) => {
    var username = req.body.Username;
    var password = req.body.Password;
    if (username && password) {
        let results = await db.pool.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password]);
        if (results.length > 0) {
            //req.session.loggedin = true;
            //req.session.username = username;
            res.send('Correct Username and Password!');
        } else {
            res.send('Incorrect Username and/or Password!');
        }
    } else {
        res.send('Please enter Username and Password!');
    }
};
