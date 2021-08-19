const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const Mongostore = require('connect-mongo')(session);
require('./config/passport_config');

const app = express();
const port = process.env.PORT || 3000;
const URI = process.env.URI || 'mongodb://localhost:27017/fyp';

//if using the local .env
//then start the server using this command:
//env $(cat .env) nodemon

//start web server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`http://127.0.0.1:${port}`);
});

//connection with mongoose
mongoose.Promise = global.Promise;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log(err);
});

//setting template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./views/assets'));

//middleware
app.use(body_parser.urlencoded({
    extended: false
}));

//session middleware
app.use(session({
    secret: 'secretKey',
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
});

//fetch routes
app.use(require('./Routes/Routes'));