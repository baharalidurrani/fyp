const PaperModel = require('../Models/Paper');

exports.get = (req, res) => {
    if (req.user._loggedAs == 'editor') {
        res.render('RepoEditor', {
            User: req.user
        });
    } else if (req.user._loggedAs == 'reviewer') {
        res.render('RepoReviewer', {
            User: req.user
        });
    } else if (req.user._loggedAs == 'author') {
        PaperModel.find({
            _author: req.user._id
        }).then((papers) => {
            console.log(papers);
            res.render('RepoAuthor', {
                User: req.user,
                Papers: papers
            });
        }).catch((err) => {
            console.log(err);
            res.redirect('/');
        });
    }
}