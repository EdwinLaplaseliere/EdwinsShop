const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: 'This field is required.'
    },
    price: {
        type: String
    },
    category: {
        type: String
    }
});


mongoose.model('Item', itemSchema);