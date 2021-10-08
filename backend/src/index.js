require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes.js')(app);

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
