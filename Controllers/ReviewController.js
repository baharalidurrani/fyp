const ReviewModel = require('../Models/Review');

exports.post = (req, res) => {
    ReviewModel.findOneAndUpdate({
        _paper: req.body.PAPER,
        _reviewer: req.user._id
    }, {
        _comment4author: req.body.FORAUTHOR,
        _comment4editor: req.body.FOREDITOR,
        _tempStatus: req.body.AS
    }).then(() => {
        console.log('review updated for paper with id: ' + req.body.PAPER);
        res.redirect('/repo');
    }).catch((err) => {
        console.log(err);
        res.redirect('/');
    })
}