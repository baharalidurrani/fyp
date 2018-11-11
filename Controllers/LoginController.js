exports.get = (req, res) => {
    res.render('Login');
}

exports.changeRole = (req, res) => {
    req.user._loggedAs = req.body.AS;
    req.user.save((err, dbUser) => {
        console.log(dbUser._name + " switched to " + dbUser._loggedAs);
        res.redirect('/profile');
        if (err)
            console.log(err);
    });
}