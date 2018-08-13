const Survey = require('../models/surveys');

/* VIEWS */
// Index
exports.index = (req, res, next) => {
  // create our locals parameter
  let locals = {
    title: 'Surveys List',
  };

  Survey.find()
    .then(surveys => {
      // add the surveys to our locals
      locals.surveys = surveys;

      // render our view
      res.render('surveys/index', locals);
    })
    .catch(err => {
      next(err);
    });
};

// Show
exports.show = (req, res, next) => {
  // locals
  let locals = {
    title: 'Survey Details',
  };

  Survey.findById({
    _id: req.params.id,
  })
    .then(survey => {
      locals.survey = survey;
      res.render('surveys/show', locals);
    })
    .catch(err => {
      next(err);
    });
};

// New
exports.new = (req, res, next) => {
  // locals
  let locals = {
    title: 'New Survey',
  };

  res.render('surveys/new', locals);
};

// Edit
exports.edit = (req, res, next) => {
  // locals
  let locals = {
    title: 'Edit Survey',
  };

  Survey.findById({
    _id: req.params.id,
  })
    .then(function(survey) {
      // add the surveys to our locals
      locals.survey = survey;

      // render our view
      res.render('surveys/edit', locals);
    })
    .catch(function(err) {
      next(err);
    });
};

/* ACTIONS */
// Create
exports.create = function(req, res, next) {
  Survey.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then(function() {
      res.redirect('/' + req.user._id + '/surveys');
    })
    .catch(function(err) {
      next(err);
    });
};

// Update
exports.update = function(req, res, next) {
  Survey.findById(req.params.id)
    .then(function(survey) {
      survey.name = req.body.name;
      survey.description = req.body.description;

      survey
        .save()
        .then(function() {
          res.redirect('/surveys');
        })
        .catch(function(err) {
          next(err);
        });
    })
    .catch(function(err) {
      next(err);
    });
};

// Delete
exports.delete = function(req, res, next) {
  Survey.remove({
    _id: req.body.id,
  })
    .then(function() {
      res.redirect('/surveys');
    })
    .catch(function(err) {
      next(err);
    });
};

exports.respond = (req, res, nex) => {
  // thing
};
