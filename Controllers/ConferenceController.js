const UserModel = require('../Models/User');

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