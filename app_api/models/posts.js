var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    },
    content: {type: String, required: true}
});
mongoose.model('Post', postSchema);