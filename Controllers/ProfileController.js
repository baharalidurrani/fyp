const UserModel = require('../Models/User');

exports.display = (req, res) => {

    if (req.user._loggedAs === "admin") {
        UserModel.find({
            _rolesDemanded: {
                $ne: null
            }
        }).then((tempUsers) => {
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
    var id = req.body.data;
    var role;

    if (id.includes("editor-")) {
        role = "editor";
        id = id.replace('editor-', '');
    } else {
        role = "reviewer";
        id = id.replace('reviewer-', '');
    }

    UserModel.findById(id).then((user) => {
        var rolesDemanded = user._rolesDemanded;
        var rolesApproved = user._rolesApproved;
        rolesDemanded.splice(rolesDemanded.indexOf(role), 1);
        rolesApproved.push(role);
        UserModel.findByIdAndUpdate(id, {
            _rolesDemanded: rolesDemanded,
            _rolesApproved: rolesApproved
        }).then((uUser) => {
            console.log('roles updated for "' + user._name + '" by "' + req.user._name + '"');
            res.redirect('/profile');
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