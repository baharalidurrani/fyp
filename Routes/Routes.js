const express = require('express');
const Router = express.Router();
const Passport = require('passport');

const Login = require('../Controllers/LoginController');
const Register = require('../Controllers/RegisterController');
const Home = require('../Controllers/HomeController');
const Profile = require('../Controllers/ProfileController');
const Logout = require('../Controllers/LogoutController');
const Repo = require('../Controllers/RepoController');
const Paper = require('../Controllers/PaperController');
const Upload = require('../Controllers/UploadController');
const Approval = require('../Controllers/ApprovalController');

const Auth = require('../Middleware/passport_auth');

module.exports = Router;

//Home route
Router.get('/', Home);

//Login Route
Router.get('/login', Auth.restric, Login.get);
Router.post('/login', Passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

//change role without log off
Router.post('/reLogin', Auth.islogin, Login.changeRole);

//Register route
Router.get('/register', Auth.restric, Register.get);
Router.post('/register', Register.post);

Router.get('/profile', Auth.islogin, Profile.display);
Router.get('/edit', Auth.islogin, Profile.edit);
Router.post('/edit', Auth.islogin, Profile.update);

Router.get('/approval', Auth.islogin, Approval.get);
Router.post('/approval', Auth.islogin, Approval.approveUser);

Router.get('/logout', Logout);

Router.get('/repo', Auth.islogin, Repo.get);

Router.get('/paper', Auth.islogin, Paper.get);

Router.get('/upload', Auth.islogin, Upload.get);