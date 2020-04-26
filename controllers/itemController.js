const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const Handlebars = require('handlebars')


router.get('/', (req, res) => {
    res.render("item/addOrEdit", {
        viewTitle: "Add New Item"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


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

router.get('/delete/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/item/list');
        }
        else { console.log('Error in item delete :' + err); }
    });
});

Handlebars.registerHelper('ifmatches', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


module.exports = router;