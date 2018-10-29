const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var TempUserSchema = new Schema({
    _name: {
        type: String,
        trim: true
    },
    _age: {
        type: Number,
        trim: true
    },
    _email: {
        unique: true,
        type: String,
        required: true
    },
    _password: {
        type: String
    },
    _gender: {
        type: String
    },
    _type: {
        type: String
    }
});

// TempUserSchema.pre('save', function (next) {
//     var user = this;
//     if (!user.isModified('_password')) next();

//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(user._password, salt, (error, hash) => {

//             user._password = hash;
//             next();

//         });
//     });
// });

// TempUserSchema.methods.comparePassword = function (temp_pass, callback) {
//     var user = this;
//     bcrypt.compare(temp_pass, user._password, (err, Ismatch) => {
//         if (err) {
//             console.log(err);
//             return callback(err);
//         }

//         console.log(Ismatch);
//         callback(null, Ismatch);

//     });
// }
var TempUserModel = mongoose.model('TempUser', TempUserSchema);
module.exports = TempUserModel;