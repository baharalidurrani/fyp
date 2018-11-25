const PaperModel = require('../Models/Paper');

exports.get = (req, res) => {
    if (req.user._loggedAs == 'editor') {
        PaperModel.find({
            _status: {
                $ne: 'published'
            }
        }).populate('_author').lean().then((papers) => {

            //intercepting data before sending it to the client side
            for (var i = 0; i < papers.length; i++) {
                //replacing the whole User object by only its _name
                papers[i]._author = papers[i]._author._name;
            }

            console.log(papers);
            res.render('RepoEditor', {
                Papers: papers
            });
        }).catch((err) => {
            console.log(err);
            res.redirect('/');
        });
    } else if (req.user._loggedAs == 'reviewer') {
        PaperModel.find({
            _reviews: req.user._id
        }).then((papers) => {
            console.log(papers);
            res.render('RepoReviewer', {
                Papers: papers
            });
        }).catch((err) => {
            console.log(err);
            res.redirect('/');
        });
    } else if (req.user._loggedAs == 'author') {
        PaperModel.find({
            _author: req.user._id
        }).then((papers) => {
            console.log(papers);
            res.render('RepoAuthor', {
                Papers: papers
            });
        }).catch((err) => {
            console.log(err);
            res.redirect('/');
        });
    }
}