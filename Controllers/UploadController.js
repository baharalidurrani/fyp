const ConferenceModel = require('../Models/Conference');

exports.get = (req, res) => {
    ConferenceModel.find().then((conferences) => {
        res.render('Upload', {
            Conferences: conferences,
        });
    }).catch((err) => console.log(err));
}

exports.post = (req, res) => {
    console.log(req.body);
}