/**
 * mongose is use to connect to the database 
 */
const mongoose = require('mongoose');

require('dotenv').config();
/**
 * This is the link to connect to the data base with the username and pasword
 */
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('You are connected') }
    else { console.log('Something happend, please try again : ' + err) }
});

require('./item.model');
