const ConferenceModel = require('../Models/Conference');
const PaperModel = require('../Models/Paper');
const UserModel = require('../Models/User');

// exports.get = (req, res) => {
//     res.render('Assign');
// }

exports.post = (req, res) => {
    PaperModel.findById(req.body.PAPER).then((paper) => {
        ConferenceModel.findById(req.body.CONFERENCE).populate('_reviewers').then((data) => {
            res.render('Assign', {
                Reviewers: data._reviewers,
                Paper: paper
            });
        });
    }).catch((err) => {
        console.log(err);
        res.redirect('/');
    });
}

exports.assigning = (req, res) => {
    //check is no checkbox is clicked
    if (req.body.REVIEWERS != undefined) {
        var paper = req.body.PAPER;
        var reviewers = [];

        //check if only one checkbox is clicked 
        if (Array.isArray(req.body.REVIEWERS))
            reviewers = req.body.REVIEWERS;
        //convert single variable into array
        else
            reviewers[0] = req.body.REVIEWERS;

        console.log('paper');
        console.log(paper);
        console.log('reviewers');
        console.log(reviewers);
    } else
        res.redirect('/repo');
}