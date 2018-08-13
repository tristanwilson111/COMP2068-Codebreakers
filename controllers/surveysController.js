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
  let questions = [];
  if (req.body['prompt'] && req.body['name']) {
    // assign our fields results to variables
    let q_prompts = req.body['prompt'];
    let q_names = req.body['name'];

    if (q_prompts && Array.isArray(q_prompts)) {
      for (let i = 0; i < q_prompts.length; i++) {
        questions.push({ prompt: q_prompts[i], name: q_names[i] });
      }
    } else {
      questions.push({ prompt: q_prompts, name: q_names });
    }
  }

  Survey.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then(function() {
      res.redirect('/surveys');
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

exports.writeResponse = (req, res, nex) => {
  Survey.findById({
    _id: req.params.id,
  })
    .then(survey => {
      // add the surveys to our locals
      locals.survey = survey;

      // render our view
      res.render('surveys/respond', locals);
    })
    .catch(err => {
      next(err);
    });
};

exports.commitResponse = (req, res, nex) => {
  Survey.update(
    {
      _id: req.params.id,
    },
    {
      $push: { reponses: req.body.response },
    },
  )
    .then(res =>
      // render our view
      res.redirect('surveys'),
    )
    .catch(err => {
      next(err);
    });
};
