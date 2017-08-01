var express = require('express');
var router = express.Router();
var User = require('../models/user');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest:'public/images/'});


module.exports = function(passport) {

router.post('/register', upload.single('file'), function(req, res){ //console.log(req.file); console.log(req.body);  exit;
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

router.post('/welcome', function(req, res) {
    
    return res.status(200).json({
        user: req.user
    });
});

router.get('/delete', function(req,res) {
    //console.log(req.user._id); exit;
    var response = {};
    User.findByIdAndRemove(req.user._id, function(err, userp){
        response = {
            message: "User deleted Successfully",
            user: userp.Name
        }
    });
    return res.status(200).json({
        response: response
    });
});

router.post('/update', function(req,res){ //console.log(req.body.userData); exit;
    var response = {};
    User.findById(req.user._id, function(err, usertemp){
        if(err){
            return res.status(500);
        } else {
            usertemp.Name = req.body.userData.name || usertemp.Name;
            usertemp.Username = req.body.userData.username || usertemp.Username;
            usertemp.Gender = req.body.userData.gender || usertemp.Gender;
            usertemp.Dob = req.body.userData.date || usertemp.Dob;
            
            usertemp.save(function (err, usertemp) {
                if (err) {
                    return res.status(500);
                }
                return res.status(200).json({
                    response: usertemp
                });
            });

        }
    })
});

return router;

}