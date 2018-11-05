const UserModel = require('../Models/User');

exports.get = (req, res) => {

    if (req.user._loggedAs === "admin") {
        UserModel.find({
            _rolesDemanded: {
                $ne: null
            }
        }).then((tempUsers) => {
            res.render('Approval', {
                TempUsers: tempUsers,
            });
        });
    } else {
        res.redirect('/profile');
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
            res.redirect('/approval');
        });
    });
}