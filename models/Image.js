const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    filename: String
});

module.exports = mongoose.model('Image', ImageSchema);
