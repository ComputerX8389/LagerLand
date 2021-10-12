const db = require('../db.js');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res) => {
    let username = req.body.Username;
    let password = req.body.Password;
    if (username && password) {
        let results = await db.pool.query('SELECT * FROM Users WHERE username = ?', [username]);
        if (results.length > 0) {
            console.log(results[0]);

            res.status(200).json('Correct Username and Password!');
        } else {
            res.status(500).json('Incorrect Username and/or Password!');
        }
    } else {
        res.status(500).json('Please enter Username and Password!');
    }
};

exports.register = async (req, res) => {
    let username = req.body.Username;
    let password = req.body.Password;
    let fullname = req.body.FullName;
    let email = req.body.Email;

    if (username && password && fullname && email) {
        let results = await db.pool.query('SELECT * FROM Users WHERE username = ?', [username]);
        if (results.length > 0) {
            return res.status(500).json('Username already exists!');
        }

        let token = jwt.sign({ username, email }, process.env.TOKEN_KEY, { expiresIn: '2h' });
        await db.pool.query('INSERT INTO Users (Username, Password, FullName, Email, Token) VALUES (?, ?, ?, ?, ?)', [username, password, fullname, email, token]);

        return res.status(201).json('User registered successfully!');
    } else {
        return res.status(500).json('Please enter Username, Password, FullName and Email');
    }
};
