const db = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.auth = async (req, res) => {
    const username = req.body.Username;
    const password = req.body.Password;

    try {
        if (username && password) {
            let results = await db.pool.query('SELECT * FROM Users WHERE username = ?', [username]);
            let user = results[0];

            if (results.length == 0) {
                return res.status(500).json('Username does not exist!');
            }

            if (bcrypt.compareSync(password, user.Password)) {
                let token = jwt.sign({ username: user.Username, email: user.Email }, process.env.TOKEN_KEY, { expiresIn: '2h' });
                user.Token = token;
                await db.pool.query('UPDATE Users SET Token=? WHERE ID=?', [token, user.ID]);
            } else {
                return res.status(500).json('Password is incorrect!');
            }

            user.Password = undefined;
            return res.status(200).json(user);
        } else {
            return res.status(500).json('Please enter Username and Password!');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
};

exports.register = async (req, res) => {
    const username = req.body.Username;
    const password = req.body.Password;
    const fullname = req.body.FullName;
    const email = req.body.Email;

    try {
        if (username && password && fullname && email) {
            let results = await db.pool.query('SELECT * FROM Users WHERE username = ?', [username]);
            if (results.length > 0) {
                return res.status(500).json('Username already exists!');
            }

            let hashedPassword = bcrypt.hashSync(password, 10);

            await db.pool.query('INSERT INTO Users (Username, Password, FullName, Email) VALUES (?, ?, ?, ?)', [username, hashedPassword, fullname, email]);

            return res.status(201).json('User registered successfully!');
        } else {
            return res.status(500).json('Please enter Username, Password, FullName and Email');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
};
