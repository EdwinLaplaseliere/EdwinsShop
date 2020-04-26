/**
 * mongose is use to connect to the database 
 */
const mongoose = require('mongoose');


/**
 * This is the link to connect to the data base with the username and pasword
 */
mongoose.connect('mongodb+srv://EdGarces:pass1234!@cluster0-54wkk.mongodb.net/ItemDB?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('You are connected') }
    else { console.log('Something happend, please try again : ' + err) }
});

require('./item.model');
