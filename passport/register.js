var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    passport.use('register', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback: true
    },
     function(req, username, password, done){
        findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'Username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.Username = username;
                        newUser.Password = createHash(password);
                        newUser.name = req.body.name;
                        newUser.Dob = req.body.dob;
                        newUser.Gender = req.body.gender;
                        newUser.created_at = new Date();
                        //console.log(newUser); exit;
                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            process.nextTick(findOrCreateUser);
     })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}