const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    content: String
});

module.exports = mongoose.model('Post', PostSchema);
