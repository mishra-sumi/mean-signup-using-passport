var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    Name : String,
    Username : {type: String, unique: true},
    Dob : Date,
    Gender : String,
    Password : String,
    created_at : Date
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

module.exports = User;