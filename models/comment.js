var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;
var commentsSchema = new Schema({
    topic_id : {type: ObjectId, ref: 'Topic'},
    comment : String,
    creater : {type: ObjectId, ref: 'User'},
    created_at : Date
});

var Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
