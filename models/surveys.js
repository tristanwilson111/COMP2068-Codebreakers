const mongoose = require('mongoose');

const SurveyLineSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required:
      'Survey line must have an associated prompt (I.E. a question or data label).',
  },
  name: {
    type: String,
    required: 'Survey line must have a data name.',
  },
});

const SurveySchema = new mongoose.Schema({
  creatorName: {
    type: String,
    // required: 'Survey must be have a name.',
  },
  surveyName: {
    type: String,
    // required: 'Survey must have a name.',
  },
  description: {
    type: String,
    // required: 'Please enter a survey description.',
  },
  surveyData: [SurveyLineSchema],
  responses: [Object],
});

// make this class public
module.exports = mongoose.model('Surveys', SurveySchema);
