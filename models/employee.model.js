const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
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


mongoose.model('Employee', employeeSchema);