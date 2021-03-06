require('./models/db');// requiring the data base to start the server

/**
 * These are dependecies previously installed and now required for the server
 */
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');


//the server requires tyhe item controller
const itemController = require('./controllers/itemController');

var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
/**
 * defining the body, default layout and the path for the layouts
 */
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');


/**
 * Assigning the port 
 */
app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/item', itemController);