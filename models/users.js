var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/webapi');
// create instance of Schema
var mongoSchema =   mongoose.Schema;

// create schema
var userSchema  = mongoose.Schema({
    username: String,
    points : {
        type : Number,
        default : 0
    },
    latitude : String,
    longtitude : String,    
    user_status : {
        type : Number,
        default : 1
    }
});

// create model if not exists.
module.exports = mongoose.model('user',userSchema);