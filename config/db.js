const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://EdGarces:pass1234!@cluster0-54wkk.mongodb.net/EmployeeDB?retryWrites=true&w=majority',
{useNewUrlParser:true},(err)=>{
if(!err){console.log('Yesss')}
else{console.log('nooo')}

});

// module.exports= {
// url: "mongodb+srv://EdGarces:pass1234!@cluster0-54wkk.mongodb.net/EmployeeDB?retryWrites=true&w=majority"
// }

require('./employee.model');