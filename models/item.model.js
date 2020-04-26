const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: 'A name for the Item should be entered'
    },
    price: {
        type: String
    },
    category: {
        type: String
    }
});


itemSchema.path('price').validate((val)=>{
priceRegex=/^[+-]?\d+(\.\d+)?$/;
return priceRegex.test(val);}, 'invalid price'
);


mongoose.model('Item', itemSchema);