const User = require('../models/user');
const passport = require('passport');
const Survey = require('../models/surveys');

/* VIEWS */
exports.new = function(req, res, next) {
  // check for invalid login messages in the session object
  let messages = req.session.messages || [];

  // clear the session messages
  req.session.messages = [];

  // render
  res.render('users/new', {
    title: 'User Registration',
    messages: messages,
    user: req.user,
  });
};

/* ACTIONS */
exports.create = function(req, res, next) {
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
  )
    .then(function(user) {
      req.login(user, function() {
        res.redirect('/surveys');
      });
    })
    .catch(function(err) {
      req.session.messages = 'There was an issue registering your account.';

      res.redirect('/users/new');
    });
};

exports.mySurveys = (req, res, next) => {
  Survey.find({ creatorID: req.user._id })
    .then(surveys => {
      res.render('users/surveys', { surveys });
    })
    .catch(err => {
      next(err);
    });
};
