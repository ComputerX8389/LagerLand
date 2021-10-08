const Itemcontroller = require('./controllers/itemcontroller');
const Categorycontroller = require('./controllers/categorycontroller');
const Usercontroller = require('./controllers/usercontroller');
const Scancontroller = require('./controllers/scancontroller');
const router = require('express').Router();

module.exports = (app) => {
    // Items
    router.get('/Items', Itemcontroller.get);
    router.post('/Items', Itemcontroller.post);

    // Categories
    router.get('/Categories', Categorycontroller.get);
    router.post('/Categories', Categorycontroller.post);

    // Scans
    router.post('/Scans', Scancontroller.post);

    // Users
    router.post('/auth', Usercontroller.auth);

    app.use('/', router);
};
