var express = require('express');
var router = express.Router();
var User = require('../models/user');


module.exports = function(passport) {

router.post('/register', function(req, res){
        passport.authenticate('register')(req, res, function(){
            return res.status(200).json({
                status: 'Registration Successfull'
            });
        });
});

router.post('/login', function(req, res, next){
    passport.authenticate('login', function(err, user, info){
        if(err){
            return next(err);
        }
        if(!user) { 
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err){
            if(err){
                return res.status(500).json({
                    err: 'Could not login user'
                });
            }
            res.status(200).json({
                status: 'Login Successfull'
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) { 
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});


return router;

}