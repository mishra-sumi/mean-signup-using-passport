var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;
var topicSchema = new Schema({
    title : String,
    topic : String,
    file : Object,
    creater : {type: ObjectId, ref: 'User'},
    comment : [{type: ObjectId, ref: 'Comments'}],
    created_at : Date
});


var Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;