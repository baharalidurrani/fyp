const UserModel = require('../Models/User');

exports.get = (req, res) => {
    res.render('Register');
}
exports.post = (req, res) => {
    console.log('new user sign up:')
    console.log(req.body);

    var userModel = new UserModel({
        _name: req.body.NAME,
        _email: req.body.EMAIL,
        _password: req.body.PASS,
        _gender: req.body.GENDER,
        _rolesDemanded: req.body.AS
    });
    userModel.save().then((temp) => {
        console.log(temp);
        res.redirect('/')
    }).catch((err) => res.redirect('/login'));
}