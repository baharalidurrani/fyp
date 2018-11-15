const ConferenceModel = require('../Models/Conference');
const UserModel = require('../Models/User');

// exports.get = (req, res) => {
//     res.render('Assign');
// }

exports.post = (req, res) => {
    ConferenceModel.findById(req.body.CONFERENCE).populate('_reviewers').then((data) => {
        res.render('Assign', {
            Reviewers: data._reviewers
        });
    });
}