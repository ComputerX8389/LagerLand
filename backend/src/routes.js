module.exports = (app) => {
    const Itemcontroller = require('./controllers/itemcontroller');
    var router = require('express').Router();

    // Hardware Routes
    router.get('/Items', Itemcontroller.get);
    router.post('/Items', Itemcontroller.post);

    app.use('/', router);
};
