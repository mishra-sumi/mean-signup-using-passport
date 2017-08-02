var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
    title : String,
    topic : String,
    file : Object,
    creater : String,
    created_at : Date
});


var Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;