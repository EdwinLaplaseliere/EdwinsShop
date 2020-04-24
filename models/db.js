const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://EdwinGarces:pass1234!@cluster0-54wkk.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser:true},(err)=>{

    if(!err){console.log('Mongo DB Connection Succeeded')}
    else{console.log('Error in DB connection:'+ err)}
}
);
require('./employee.model');