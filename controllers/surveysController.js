var Survey = require('../models/surveys');

/* VIEWS */
// Index
exports.index = function(req, res, next) {
  // create our locals parameter
  let locals = {
    title: 'Surveys List',
  };

  Survey.find()
    .then(function(surveys) {
      // add the surveys to our locals
      locals.surveys = surveys;

      // render our view
      res.render('surveys/index', locals);
    })
    .catch(function(err) {
      next(err);
    });
};

// Show
exports.show = function(req, res, next) {
  // locals
  let locals = {
    title: 'Survey Details',
  };

  Survey.findById({
    _id: req.params.id,
  })
    .then(function(survey) {
      locals.survey = survey;
      res.render('surveys/show', locals);
    })
    .catch(function(err) {
      next(err);
    });
};

// New
exports.new = function(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.messages = [];
    req.session.messages.push('Please login.');

    return res.redirect('/sessions/new');
  }

  // locals
  let locals = {
    title: 'New Survey',
  };

  res.render('surveys/new', locals);
};

// Edit
exports.edit = function(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.messages = [];
    req.session.messages.push('Please login.');

    return res.redirect('/sessions/new');
  }

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
  if (!req.isAuthenticated()) {
    req.session.messages = [];
    req.session.messages.push('Please login.');

    return res.redirect('/sessions/new');
  }

  // // specifications
  // let specifications = null;
  // if (req.body['specification[key]'] && req.body['specification[value]']) {
  //   // assign our fields results to variables
  //   let spec_keys = req.body['specification[key]'];
  //   let spec_values = req.body['specification[value]'];

  //   // assign an empty array to specfications
  //   specifications = [];

  //   // verify that spec keys and values are equal
  //   // populate if an array
  //   if (spec_keys && Array.isArray(spec_keys)) {
  //     for (let i = 0; i < spec_keys.length; i++) {
  //       specifications.push({ key: spec_keys[i], value: spec_values[i] });
  //     }
  //   } else {
  //     // populate if a string
  //     specifications.push({ key: spec_keys, value: spec_values });
  //   }
  // }

  Survey.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    specifications: specifications,
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
  if (!req.isAuthenticated()) {
    req.session.messages = [];
    req.session.messages.push('Please login.');

    return res.redirect('/sessions/new');
  }

  // // specifications
  // console.log(req.body);
  // let specifications = null;
  // if (req.body['specification[key]'] && req.body['specification[value]']) {
  //   // assign our fields results to variables
  //   let spec_keys = req.body['specification[key]'];
  //   let spec_values = req.body['specification[value]'];

  //   // assign an empty array to specfications
  //   specifications = [];

  //   // populate if an array
  //   if (spec_keys && Array.isArray(spec_keys)) {
  //     for (let i = 0; i < spec_keys.length; i++) {
  //       specifications.push({ key: spec_keys[i], value: spec_values[i] });
  //     }
  //   } else {
  //     // populate if a string
  //     specifications.push({ key: spec_keys, value: spec_values });
  //   }
  // }

  Survey.findById(req.params.id)
    .then(function(survey) {
      survey.name = req.body.name;
      survey.description = req.body.description;
      survey.price = req.body.price;
      survey.specifications = specifications;

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
  if (!req.isAuthenticated()) {
    req.session.messages = [];
    req.session.messages.push('Please login.');

    return res.redirect('/sessions/new');
  }

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
