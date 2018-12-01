const ConferenceModel = require('../Models/Conference');
const PaperModel = require('../Models/Paper');

exports.get = (req, res) => {
    if (req.user._loggedAs == 'author') {
        if (req.query.CONFERENCE == undefined) {
            ConferenceModel.find().then((conferences) => {
                res.render('Upload', {
                    Conferences: conferences
                });
            }).catch((err) => console.log(err));
        } else {
            ConferenceModel.find({
                _id: req.query.CONFERENCE
            }).then((conferences) => {
                res.render('Upload', {
                    Conferences: conferences
                });
            }).catch((err) => console.log(err));
        }
    } else {
        res.redirect('/profile');
    }
}

exports.post = (req, res) => {
    console.log('new paper uploaded');
    console.log(req.body);

    var paperModel = new PaperModel({
        _title: req.body.TITLE,
        _author: req.user._id,
        _intro: req.body.INTRO,
        _file: req.body.FILE,
        _conference: req.body.CONFERENCE,
        _status: 'unassigned'
    });
    paperModel.save().then(() => {
        console.log('paper uploaded successfuly');
        res.redirect('/repo')
    }).catch((err) => {
        console.log(err);
        res.redirect('/upload');
    });
}