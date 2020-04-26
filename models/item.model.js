const mongoose = require('mongoose');

/**
 * This creates an Item object to be store in the database
 */
var itemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: 'A name for the Item should be entered' // this field requieres an item to be entered
    },
    price: {
        type: String
    },
    category: {
        type: String
    }
});

/**
 * Validating the price as a float which allows to enter numbers and dots only
 */
itemSchema.path('price').validate((val)=>{
priceRegex=/^[+-]?\d+(\.\d+)?$/;
return priceRegex.test(val);}, 'invalid price'
);


mongoose.model('Item', itemSchema);