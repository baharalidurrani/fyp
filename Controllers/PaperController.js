const PaperModel = require('../Models/Paper');

exports.get = (req, res) => {
    res.render('Paper');
}

exports.post = (req, res) => {
    if (req.user._loggedAs === "editor") {
        PaperModel.findOneAndUpdate({
            _id: req.body.PAPER
        }, {
            _status: req.body.STATUS
        }).then((paper) => {
            console.log('status updated for');
            console.log(paper._title);
            res.redirect('/repo');
        }).catch((err) => {
            console.log('error updating status');
            console.log(err);
            res.redirect('/');
        });
    }
}