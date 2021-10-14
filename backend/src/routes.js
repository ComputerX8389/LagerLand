const Itemcontroller = require('./controllers/itemcontroller');
const Categorycontroller = require('./controllers/categorycontroller');
const Usercontroller = require('./controllers/usercontroller');
const Scancontroller = require('./controllers/scancontroller');
const auth = require('./middleware/auth');
const router = require('express').Router();

module.exports = (app) => {
    // Items
    router.get('/Items', auth, Itemcontroller.get);
    router.post('/Items', auth, Itemcontroller.post);

    // Categories
    router.get('/Categories', auth, Categorycontroller.get);
    router.post('/Categories', auth, Categorycontroller.post);

    // Scans
    router.get('/Scans', auth, Scancontroller.get);
    router.post('/Scans', auth, Scancontroller.post);

    // Users
    router.post('/Auth', Usercontroller.auth);
    router.post('/Register', Usercontroller.register);

    app.use('/', router);
};
