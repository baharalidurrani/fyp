const PaperModel = require('../Models/Paper');
const ReviewModel = require('../Models/Review');

exports.get = (req, res) => {
    if (req.user._loggedAs == 'editor') {
        PaperModel.find({
            _status: {
                $ne: 'published'
            }

            //.lean() is used to trim extra details returned by the query
            //https://stackoverflow.com/questions/32397419/model-findone-not-returning-docs-but-returning-a-wrapper-object
        }).populate('_author').populate('_reviews').lean().then((papers) => {

            //intercepting data before sending it to the client side
            for (var i = 0; i < papers.length; i++) {
                //replacing the whole User object by only its _name
                papers[i]._author = papers[i]._author._name;
            }
            res.render('RepoEditor', {
                Papers: papers
            });
        }).catch((err) => {
            console.log(err);
            res.redirect('/');
        });
    } else if (req.user._loggedAs == 'reviewer') {
        ReviewModel.find({
            _reviewer: req.user._id
        }).populate('_paper').then((reviews) => {
            for (var j = 0; j < reviews.length; j++) {
                var obj = {
                    _id: reviews[j]._paper._id,
                    _title: reviews[j]._paper._title,
                    _file: reviews[j]._paper._file,
                    _intro: reviews[j]._paper._intro,
                }
                reviews[j] = obj;
            }
            console.log(reviews);
            res.render('RepoReviewer', {
                Papers: reviews
            });
        }).catch((err) => {
            console.log(err);
            res.redirect('/');
        });
    } else if (req.user._loggedAs == 'author') {
        PaperModel.find({
            _author: req.user._id
        }).populate('_reviews').then((papers) => {
            res.render('RepoAuthor', {
                Papers: papers
            });
        }).catch((err) => {
            console.log(err);
            res.redirect('/');
        });
    }
}