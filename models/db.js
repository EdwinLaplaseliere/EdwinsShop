const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://EdGarces:pass1234!@cluster0-54wkk.mongodb.net/ItemDB?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./item.model');