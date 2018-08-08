const UserModel = require('../Models/User');
exports.get = (req, res) => {
    res.render('Register');
}
exports.post = (req, res) => {
    var user = new UserModel({

        _name: req.body.NAME,
        _email: req.body.EMAIL,
        _password: req.body.PASS,
        _gender: req.body.GENDER
    });

    user.save().then(() => res.redirect('/'))
        .catch((err) => res.redirect('/login'));

}