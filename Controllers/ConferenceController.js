const UserModel = require('../Models/User');
const ConferenceModel = require('../Models/Conference');


exports.get = (req, res) => {
    if (req.user._loggedAs === "editor") {
        UserModel.find({
            _rolesApproved: "reviewer"
        }).then((reviewers) => {
            res.render('Conference', {
                Reviewers: reviewers,
            });
        });
    } else {
        res.redirect('/repo');
    }
}

exports.post = (req, res) => {
    console.log('create new conference');
    console.log(req.body);

    var conferenceModel = new ConferenceModel({
        _name: req.body.NAME,
        _location: req.body.LOCATION,
        _date: req.body.DATE,
        _deadline: req.body.DEADLINE,
        _reviewers: req.body.REVIEWERS
    });
    conferenceModel.save().then((temp) => {
        console.log('conference registered successfuly');
        res.redirect('/')
    }).catch((err) => {
        console.log(err);
        res.redirect('/conference');
    });
}

exports.view = (req, res) => {
    ConferenceModel.findById(req.params.id).then((data) => {
        if (req.user)
            data.user_loggedAs = req.user._loggedAs;
        data._reviewers = null;

        res.render('ConferenceView', {
            Conference: data
        });
    }).catch((err) => {
        console.log(err);
        res.redirect('/');
    });
}