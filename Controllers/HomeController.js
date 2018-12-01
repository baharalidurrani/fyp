const PaperModel = require('../Models/Paper');
const ConferenceModel = require('../Models/Conference');

module.exports = (req, res) => {
    //query 1
    const papersPromise = PaperModel.find({
        _status: 'published'
    }).populate('_author').lean();

    //query 2
    const conferencesPromise = ConferenceModel.find();

    Promise.all([papersPromise, conferencesPromise]).then((data) => {
        var papers = data[0];
        var conferences = data[1];

        for (let i = 0; i < papers.length; i++) {
            //replacing the whole User object by only its _name
            papers[i]._author = papers[i]._author._name;
            papers[i]._reviews = null;
        }

        for (let i = 0; i < conferences.length; i++) {
            conferences[i]._reviewers = null;
        }

        res.render('Home', {
            Papers: papers,
            Conferences: conferences
        });
    });
}