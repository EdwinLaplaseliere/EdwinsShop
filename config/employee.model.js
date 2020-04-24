const mongoose = require('mongoose');
var employeeSchema=new mongoose.Schema({

fullName:{

    Type: String
},
email:{
type:String
},
mobile:{

    Type: String
},
city:{
type:String
}
});

mongoose.model('Employee',employeeSchema);