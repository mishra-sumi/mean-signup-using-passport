var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

ObjectId = Schema.ObjectId;
var userSchema = new Schema({
    Name : String,
    Username : {type: String, unique: true},
    Dob : Date,
    Gender : String,
    file : Object,
    topic : [{type: ObjectId, ref: 'Topic'}],
    Password : String,
    created_at : Date
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

module.exports = User;