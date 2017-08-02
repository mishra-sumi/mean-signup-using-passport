var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;
var commentsSchema = new Schema({
    topic_id : ObjectId,
    comment : String,
    creater : String,
    created_at : Date
});

var Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
