exports.get = (req, res) => {
    if (req.user._loggedAs == 'reviewer') {
        res.render('RepoReviewer', {
            User: req.user
        });
    } else if (req.user._loggedAs == 'author') {
        res.render('RepoAuthor', {
            User: req.user
        });
    }
}