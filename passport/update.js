var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    passport.use('update', new LocalStrategy({
        usernameField : 'username',
        passReqToCallback: true
    },
     function(req, username, done){ console.log(req.body); console.log("inside update passport"); exit;
        //User.findById(req.body.user._id)
     })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}