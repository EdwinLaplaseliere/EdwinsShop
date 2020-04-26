const express = require('express');// requiring express because it needs to be used later throughout the program
var router = express.Router();// we need the router to implement the CRUD
const mongoose = require('mongoose'); // we need mongoose for the database
const Item = mongoose.model('Item');// item is the database collection, it makes an Item object and sends it to the database
const Handlebars = require('handlebars')// Handlebars is used to implement java scripts in the templates 

/**
 * This first get call starts the program by directing the user to the main page
 */
router.get('/', (req, res) => {
    res.render("item/addOrEdit", {
        viewTitle: "Add New Item"
    });
});

/**
 * This post creates a new item by calling the insertRecord function
 * or update an item by calling theupdateRecord function if the id isnt empty
 */
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

/**
 * Takes a request and responds with an action
 * The action could be redirecting to the list or keeping the user in the add page
 * @param {*} req 
 * @param {*} res 
 */
function insertRecord(req, res) {
    var item = new Item();
    item.item = req.body.item;
    item.price = req.body.price;
    if (item.price.length<2){
        item.price=item.price + '.00';
    } else if(item.price.length==3){
    item.price=item.price + '0';
    }
    item.category = req.body.category;
    item.save((err, doc) => {
        if (!err)
            res.redirect('item/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("item/addOrEdit", {
                    viewTitle: "Add item",
                    item: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}
/**
 * Updates a record in the data base
 * @param {*} req 
 * @param {*} res 
 */
function updateRecord(req, res) {
    Item.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('item/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("item/addOrEdit", {
                    viewTitle: 'Update item',
                    item: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

/**
 * This function takes all the information from the database and shows it to the user
 */
router.get('/list', (req, res) => {
    Item.find((err, docs) => {
        if (!err) {
            res.render("item/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving item list :' + err);
        }
    });
});

/**
 * This function as its names says it, handles Validations in the add page 
 * This validations are related to empty inputs, wrong inputs such as numbers intead of text and so on 
 * @param {*} err 
 * @param {*} body 
 */
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'item':
                body['itemError'] = err.errors[field].message;
                break;
            case 'price':
            body['priceError'] = err.errors[field].message;
            break;
            default:
                break;
        }
    }
}
/**
 * this function allows the user to update an item
 */
router.get('/:id', (req, res) => {
    Item.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("item/addOrEdit", {
                viewTitle: "Update item",
                item: doc
            });
        }
    });
});

/**
 * this function allows the user to remove an item
 */
router.get('/delete/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/item/list');
        }
        else { console.log('Error in item delete :' + err); }
    });
});

/**
 * This function is a helper which allows the showing of items by sections 
 * example: Donuts, coffes....
 */
Handlebars.registerHelper('ifmatches', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


module.exports = router;