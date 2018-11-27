const PaperModel = require('../Models/Paper');

exports.get = (req, res) => {
    res.render('Paper');
}

exports.post = (req, res) => {
    PaperModel.findOneAndUpdate({
        _id: req.body.PAPER
    }, {
        _status: req.body.STATUS
    }).then((paper) => {
        console.log('status updated for');
        console.log(paper);
        res.redirect('/repo');
    }).catch((err) => {
        console.log('error updating status');
        console.log(err);
        res.redirect('/');
    });
}