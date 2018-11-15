const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaperSchema = new Schema({
    _title: {
        type: String,
        trim: true,
        required: true
    },
    _author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _intro: {
        type: String,
        trim: true,
        required: true
    },
    _file: {
        type: String,
        required: true
    },
    _conference: {
        type: Schema.Types.ObjectId,
        ref: 'Conference',
        required: true
    },
    _status: {
        type: String,
    },
    _reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    _plagirism: {
        type: String,
    }
});

var PaperModel = mongoose.model('Paper', PaperSchema);
module.exports = PaperModel;