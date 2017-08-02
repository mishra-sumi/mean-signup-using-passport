var express = require('express');
var router = express.Router();
var Topic = require('../models/topic');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest:'public/topicImages/'});

router.post('/add', upload.single('file'), function(req, res){ //console.log(req.body); console.log(req.file); console.log(req.user); exit;

    var topic = new Topic();
    topic.title = req.body.title;
    topic.topic = req.body.topic;
    topic.file = req.file;
    topic.creater = req.user.Username;
    topic.created_at = new Date();
    topic.save(function(err){
        if(err){
            return res.status(500).json({
                response: err
            });
        } else {
            return res.status(200).json({
                response: "Topic added successfully"
            });
        }
    });
});

router.get('/list', function(req,res){

    username = req.user.Username;
    name = req.user.Name;
    filename = req.user.file.filename;
    Topic.find({creater: username}, function(err, obj){
        if(err){
            return res.status(500).json({
                response: err 
            });
        } else {
            return res.status(200).json({
                response: {data: obj, name: name, filename: filename}
            });
        }
    });
});

module.exports = router;