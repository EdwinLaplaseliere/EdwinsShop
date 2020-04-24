const express = require('express');
const path = require('path');
const exphbs= require('express-handlebars');
const MongoClient = require ('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db =require('./config/db')
const app = express();
const bodyparser= require('body-parser');

const employeeController=require('./controllers/employeeController');


app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());


app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname: 'hbs', defaultLayout: 'mainLayout',layoutsDir:__dirname+ '/views/layouts/'}));
app.set('view engine', 'hbs');

const port =3000;
app.use(bodyParser.urlencoded({extended: true}))



MongoClient.connect(db.url,(err,database)=>{

    if(err) return console.log(err)


//     require('./app/routes')(app, database);

app.listen(port, ()=>{
console.log("We are live on "+ port);
});

});

app.use('/employee',employeeController);