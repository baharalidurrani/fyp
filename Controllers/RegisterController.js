const UserModel = require('../Models/User');
const TempUserModel = require('../Models/TempUser');

exports.get = (req, res) => {
    res.render('Register');
}
exports.post = (req, res) => {
    console.log(req.body);

    var userModel = new UserModel({
        _name: req.body.NAME,
        _email: req.body.EMAIL,
        _password: req.body.PASS,
        _gender: req.body.GENDER,
        _type: req.body.TYPE
    });
    console.log(userModel);
    if (userModel._type === "reviewer") {
        var tempUserModel = new TempUserModel({
            _id: userModel._id,
            _name: userModel._name,
            _email: userModel._email,
            _password: userModel._password,
            _gender: userModel._gender,
            _type: userModel._type
        });
        tempUserModel.save().then((temp) => {
            console.log(temp);
            res.redirect('/')
        }).catch((err) => res.redirect('/login'));
    } else {
        userModel.save().then((temp) => {
            console.log(temp);
            res.redirect('/')
        }).catch((err) => res.redirect('/login'));
    }
}