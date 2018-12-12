const ConferenceModel = require('../Models/Conference');
const PaperModel = require('../Models/Paper');
const UserModel = require('../Models/User');
const ReviewModel = require('../Models/Review');

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

        //arranging JSON array for ReviewModel.insertMany//////////////////////////
        var dataArray = new Array();
        for (var i = 0; i < reviewers.length; i++) {
            var jsonArg = new Object();
            jsonArg._paper = paper;
            jsonArg._reviewer = reviewers[i];
            jsonArg._comment4author = 'NOT REVIEWED YET';
            jsonArg._comment4editor = 'NOT REVIEWED YET';
            jsonArg._tempStatus = 'NOT REVIEWED YET';
            dataArray.push(jsonArg);
        }

        ReviewModel.insertMany(dataArray, function (error, docs) {
            if (error) {
                console.log(error);
                res.redirect('/');
            } else {
                var reviewerIDs = [];
                for (var j = 0; j < docs.length; j++) {
                    reviewerIDs.push(docs[j]._id);
                }
                //deprecated
                PaperModel.findOneAndUpdate({
                    _id: paper
                }, {
                    _reviews: reviewerIDs,
                    _status: 'assigned'
                }).then((dbPaper) => {
                    dbPaper._reviews = reviewerIDs;
                    console.log('reviewers added for paper');
                    console.log(dbPaper._title);
                    res.redirect('/repo');
                }).catch((err) => {
                    console.log(err);
                    console.log('problem updating paper reviewers')
                });
            }
        });
    } else {
        console.log('no reviewer selected for assigning');
        res.redirect('/');
    }
}

function emailReviewers(reviewers) {

}