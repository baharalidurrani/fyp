'use strict';
const nodemailer = require('nodemailer');

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

        //insert new documents in Review Collection
        ReviewModel.insertMany(dataArray, function (error, docs) {
            //execute this callback when new reviews insertion is completed
            if (error) {
                console.log(error);
                res.redirect('/');
            } else {
                var reviewerIDs = [];
                for (var j = 0; j < docs.length; j++) {
                    reviewerIDs.push(docs[j]._id);
                }
                //insert back link of newly inserted reviews._id (s) into the orignal Paper document
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
                    //notify teviewers over email
                    emailReviewers(reviewers);
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

function emailReviewers(reviewersIDs) {
    console.log(reviewersIDs);
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'tgunahkpoc2zwpca@ethereal.email',
                pass: 'rabukrvX6p4f67seFt'
            }
        });

        for (let i = 0; i < reviewersIDs.length; i++) {
            UserModel.findById(reviewersIDs[i]).then((user) => {

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"IIU Conference" <cms@iiu.edu.pk>', // sender address
                    to: user._email, // list of receivers
                    subject: 'Paper Assigned for Review', // Subject line
                    text: 'Hi, You have been assigned a new paper, please review it on https://cmsfyp.herokuapp.com/repo', // plain text body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                });
            });
        }
    });
}