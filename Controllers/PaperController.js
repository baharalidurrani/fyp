const PaperModel = require('../Models/Paper');

exports.get = (req, res) => {
    if (req.query.AS == "delete") {
        if (req.user._loggedAs == "author") {
            PaperModel.findByIdAndDelete(req.query.PAPER).then((paper) => {
                console.log(paper + " deleted");
                res.redirect('/repo');
            }).catch((err) => {
                console.log(err);
                res.redirect('/');
            });
        }
        console.log("postman attack blocked");
        res.redirect('/');
    } else {
        PaperModel.findById(req.query.PAPER).then((paper) => {
            console.log(paper);
            //remove this line when file uploading is complete
            paper._file = "/pdf/paper.pdf";
            res.render('Paper', {
                Paper: paper
            });
        }).catch((err) => {
            console.log(err);
            res.redirect('/');
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