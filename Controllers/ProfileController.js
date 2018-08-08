const UserModel = require('../Models/User');
exports.display = (req, res) => {

    res.render('Profile', {
        User: req.user
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