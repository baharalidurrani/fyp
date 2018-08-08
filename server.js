const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const Mongostore = require('connect-mongo')(session);
require('./config/passport_config');

const app = express();
const port = process.env.port || 3000;

//server listing on port 3000
app.listen(port, () => {

    console.log(`server listing on port ${port}`);

});

//connection with mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/authPassSession').then(() => {
    console.log('Database Connnected');
}).catch((err) => {
    console.log(err);
})

//setting template engine
app.set('view engine', 'ejs');

//middleware
app.use(body_parser.urlencoded({
    extended: false
}));

//session middleware
app.use(session({
    secret: 'secrestkey',
    resave: true,
    saveUninitialized: false,
    store: new Mongostore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.person = req.user;
    next();

})

//fetch routes
app.use(require('./Routes/Routes'));