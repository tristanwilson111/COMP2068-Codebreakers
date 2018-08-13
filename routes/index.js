var express = require('express');
var router = express.Router();
const Survey = require('../models/surveys');

/* GET home page. */
router.get('/', (req, res, next) => {
  let locals = { title: 'Shit Surveys' };
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
});

module.exports = router;
