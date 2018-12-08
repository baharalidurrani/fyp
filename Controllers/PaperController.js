const PaperModel = require('../Models/Paper');

exports.get = (req, res) => {
    if (req.query.AS == "delete") {
        res.redirect('/');
    } else {
        //find in db
        var paper = {
            _title: "Paper Title",
            _path: "/pdf/paper.pdf"
        }
        //.then
        res.render('Paper', {
            Paper: paper
        });
    }
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