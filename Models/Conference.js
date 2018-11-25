const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConferenceSchema = new Schema({
    _name: {
        type: String,
        trim: true,
        required: true
    },
    _location: {
        type: String,
        trim: true,
        required: true
    },
    _date: {
        type: String,
        trim: true,
        required: true
    },
    _deadline: {
        type: String,
        trim: true,
        required: true
    },
    _reviewers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

var ConferenceModel = mongoose.model('Conference', ConferenceSchema);
module.exports = ConferenceModel;