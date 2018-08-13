var createError = require('http-errors');
var express = require('express');

// file upload helper
const fileUpload = require('express-fileupload');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

// this is our home route
var indexRouter = require('./routes/index');

// add the surveys routes
var surveysRouter = require('./routes/surveys');

// add the users routes
var usersRouter = require('./routes/users');

// add the sessions routes
var sessionsRouter = require('./routes/sessions');

var app = express();
app.use(fileUpload());

// use mongoose to connect to mongo
var mongoose = require('mongoose');
var config = require('./config/connect');

// authentication
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;

// our connection
mongoose.connect(config.db);

// PASSPORT CONFIGURATION
app.use(
  session({
    secret: 'any string for salting here', // salt key for hashing
    resave: true, // stop user from being logged out
    saveUninitialized: false, // don't start a session if guest
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  }),
);
app.use(express.static(path.join(__dirname, 'public')));

// this is our home route
app.use('/', indexRouter);

// this is our surveys router
app.use('/surveys', surveysRouter);

// this is our sessions router
app.use('/sessions', sessionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
