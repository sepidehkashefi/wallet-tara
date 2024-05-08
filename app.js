const express = require('express')
require('dotenv').config({ path: './config.env' })
const db = require('./models');
const app = express();
const multer  = require('multer')

global.__basedir = __dirname;
global.__tempUpload = __dirname + '/tempUpload/'

db.connection.sync(
    {
        alter:
        // { drop: false },
        true
        // force : true
    })
    .then(async () => {
        // await seeds();
    })

// use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
require('./routes')(app)

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});


app.get('/', async (req, res) => {
    res.json({
        message: 'Welcome to tara wallet test application!!',
        dateTime: Date.now()

    });
})
