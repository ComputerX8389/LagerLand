const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mariadbRepo = require('../repositories/mariadb.js');

const userRepo = mariadbRepo.userRepo();

exports.auth = async (req, res) => {
    const username = req.body.Username;
    const password = req.body.Password;

    try {
        if (username && password) {
            let user = await userRepo.getByUsername(username);

            if (!user) {
                return res.status(401).json('Username or password is incorrect');
            }

            if (bcrypt.compareSync(password, user.Password)) {
                let token = jwt.sign({ username: user.Username, email: user.Email }, process.env.TOKEN_KEY, { expiresIn: '2h' });
                user.Token = token;
                await userRepo.update(user.ID, 'Token', token);
            } else {
                return res.status(401).json('Username or password is incorrect');
            }

            user.Password = undefined;
            return res.status(200).json(user);
        } else {
            return res.status(401).json('Username or password is incorrect');
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
            let user = await userRepo.getByUsername(username);
            if (!user) {
                return res.status(500).json('Username already exists!');
            }

            let hashedPassword = bcrypt.hashSync(password, 10);

            await userRepo.create(username, hashedPassword, fullname, email);

            return res.status(201).json('User registered successfully!');
        } else {
            return res.status(500).json('Please enter Username, Password, FullName and Email');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
};
