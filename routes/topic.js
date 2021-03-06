var express = require('express');
var router = express.Router();
var Topic = require('../models/topic');
var Comment = require('../models/comment');
var User = require('../models/user');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest:'public/topicImages/'});

router.post('/add', upload.single('file'), function(req, res){ //console.log(req.body); console.log(req.file); console.log(req.user); exit;

    var topic = new Topic();
    topic.title = req.body.title;
    topic.topic = req.body.topic;
    topic.file = req.file;
    topic.creater = req.user._id;
    topic.created_at = new Date();
    topic.save(function(err){
        if(err){
            return res.status(500).json({
                response: err
            });
        } else {
            User.findByIdAndUpdate(req.user._id, {$push:{topic: topic._id},}, {new: true}, function(err, data){
                if(err) throw err;
                console.log(data);
            });
            return res.status(200).json({
                response: "Topic added successfully"
            });
        }
    });
});

router.get('/list', function(req, res){

    username = req.user._id;
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

router.get('/allblog', function(req, res){

    username = req.user.Username;
    name = req.user.Name;
    filename = req.user.file.filename;
    Topic.find({}).populate({
        path: 'creater comment',
        populate: {
            path: 'creater'
        }
    }).exec(function(err, topic){
        if(err){
            return res.status(500).json({
                response: err
            });
        } else {
            return res.status(200).json({
                response: {data: topic, name: name, filename: filename, username: username}
            });
        }
    });
});

router.post('/addcomments', function(req, res){

    console.log(req.body);
    var comment = new Comment();
    comment.topic_id = req.body.topicId;
    comment.comment = req.body.comment;
    comment.creater = req.user._id;
    comment.created_at = new Date();
    comment.save(function(err){
        if(err){
            return res.status(500).json({
                response: err
            });
        } else {
            Topic.findByIdAndUpdate(req.body.topicId, {$push: {comment: comment._id},}, function(err, data){
                if(err) throw err;
                console.log(data);
            });
            return res.status(200).json({
                response: "Comment Successfull"
            });
        }
    });
});

router.get('/allcomments', function(req, res){

    var data = {};
    Topic.find({}).populate({
        path: 'creater comment'
    }).exec(function(err, comments){
        if(err){ 
            return res.status(500).json({
                response: err
            });
        } else {
            return res.status(200).json({
                response: comments
            });
        }
    });
});

module.exports = router;