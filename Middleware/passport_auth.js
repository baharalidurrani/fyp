exports.islogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/login')
    } else {
        next();
    }

}
exports.restric = (req, res, next) => {

    if (req.isAuthenticated()) {
        res.redirect('/profile');
    } else {
        next();
    }

}