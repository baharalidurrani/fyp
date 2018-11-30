const PaperModel = require('../Models/Paper');
const ConferenceModel = require('../Models/Conference');

module.exports = (req, res) => {
    PaperModel.find({
        _status: 'published'
    }).then((papers) => {
        //intercepting data before sending it to the client side
        for (var i = 0; i < papers.length; i++) {
            //replacing the whole User object by only its _name
            papers[i]._author = papers[i]._author._name;
            papers[i]._reviews = null;
        }
        console.log(papers);
    });

    ConferenceModel.find().then((conferences) => {
        for (var i = 0; i < conferences.length; i++) {
            conferences[i]._reviewers = null;
        }
        console.log(conferences);
    });
    res.render('Home');
}