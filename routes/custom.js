/*var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req,res){
    var user =  User({
        Username : req.body.user_name,
        Email : req.body.email,
        Dob : req.body.date,
        Gender : req.body.gender,
        Password : req.body.pass,
        created_at : new Date()
    });
    User.find({Username : req.body.user_name} , function(err,user){
        if(err) throw err;
        if(user){
        console.log("user already exists");
        req.flash('error', 'User already exists')
        res.redirect('/');
        return;
        }else{
            user.save(function(err){
                if(err) throw err;
                console.log('user saved successfully');
                res.json(user);
            });
        }
    });
});



module.exports = router;*/