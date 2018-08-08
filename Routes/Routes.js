const express = require('express');
const Router = express.Router();
const Passport = require('passport');

const Login = require('../Controllers/LoginController');
const Register = require('../Controllers/RegisterController');
const Home = require('../Controllers/HomeController');
const Profile = require('../Controllers/ProfileController');
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
//Register route

Router.get('/register', Auth.restric, Register.get);
Router.post('/register', Register.post);

Router.get('/profile', Auth.islogin, Profile.display);
Router.get('/logout', require('../Controllers/LogoutController'));

Router.get('/edit', Auth.islogin, Profile.edit);
Router.post('/edit', Auth.islogin, Profile.update);