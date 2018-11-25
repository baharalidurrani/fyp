const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    _paper: {
        type: Schema.Types.ObjectId,
        ref: 'Paper'
    },
    _reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _comment4author: {
        type: String
    },
    _comment4editor: {
        type: String
    },
    _tempStatus: {
        type: String
    }
});

var ReviewModel = mongoose.model('Review', ReviewSchema);
module.exports = ReviewModel;