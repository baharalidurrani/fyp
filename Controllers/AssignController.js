const ConferenceModel = require('../Models/Conference');
const PaperModel = require('../Models/Paper');
const UserModel = require('../Models/User');

// exports.get = (req, res) => {
//     res.render('Assign');
// }

exports.post = (req, res) => {
    PaperModel.findById(req.body.PAPER).then((paper) => {
        ConferenceModel.findById(req.body.CONFERENCE).populate('_reviewers').then((data) => {
            res.render('Assign', {
                Reviewers: data._reviewers,
                Paper: paper
            });
        });
    });
}

exports.assigning = (req, res) => {
    console.log(req.body);
}