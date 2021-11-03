const item = require('../models/mariadb/item');
const category = require('../models/mariadb/category');
const user = require('../models/mariadb/user');
const scan = require('../models/mariadb/scan');

exports.itemRepo = () => {
    return item;
};

exports.categoryRepo = () => {
    return category;
};

exports.userRepo = () => {
    return user;
};

exports.scanRepo = () => {
    return scan;
};
