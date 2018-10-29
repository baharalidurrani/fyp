const UserModel = require('../Models/User');
const TempUserModel = require('../Models/TempUser');

exports.display = (req, res) => {

    if (req.user._type === "admin") {
        TempUserModel.find().then((tempUsers) => {
            console.log(tempUsers);
            res.render('ProfileAdmin', {
                TempUsers: tempUsers,
                User: req.user
            });
        });
    } else {
        res.render('Profile', {
            User: req.user
        });
    }
}

exports.approveUser = (req, res) => {
    TempUserModel.findById({
        _id: req.body.ID
    }).then((temp) => {
        var userModel = new UserModel({
            _id: temp._id,
            _name: temp._name,
            _email: temp._email,
            _password: temp._password,
            _gender: temp._gender,
            _type: temp._type
        });
        userModel.save().then(() => {
            console.log(req.body.ID);
            TempUserModel.findByIdAndRemove(req.body.ID,
                function (err, data) {
                    if (!err) {
                        console.log("temp user deleted");
                        console.log(data);
                        res.redirect('/');
                    }
                });
        });
    });
}

exports.edit = (req, res) => {

    res.render('Edit', {
        User: req.user
    });
}
exports.update = (req, res) => {

    console.log(req.user._id);
    UserModel.findByIdAndUpdate(req.user._id, {
        _email: req.body.EMAIL,
        _name: req.body.NAME
    }).then((user) => {
        console.log(user);
    })
    res.send('updated');

}