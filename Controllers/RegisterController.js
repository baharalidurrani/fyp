const UserModel = require('../Models/User');
const TempUserModel = require('../Models/TempUser');

exports.get = (req, res) => {
    res.render('Register');
}
exports.post = (req, res) => {
    var user = new UserModel({

        _name: req.body.NAME,
        _email: req.body.EMAIL,
        _password: req.body.PASS,
        _gender: req.body.GENDER,
        _type: req.body.TYPE
    });

    if (user._type === "reviewer") {
        console.log("New user in TempUser need to approved");
        var tempUser = new TempUserModel({
            _name: user._name,
            _email: user._email,
            _password: user._password,
            _gender: user._gender,
            _type: user._type
        });
        tempUser.save().then(() => res.redirect('/')).catch((err) => res.redirect('/login'));

    } else {
        user.save().then(() => res.redirect('/')).catch((err) => res.redirect('/login'));
    }
}