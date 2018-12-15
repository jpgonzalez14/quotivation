const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateQuoteInput(data) {
  let errors = {};

  data.quote = !isEmpty(data.quote) ? data.quote : '';
  data.author = !isEmpty(data.author) ? data.author : '';
  data.typo = !isEmpty(data.typo) ? data.typo : '';
  data.color = !isEmpty(data.color) ? data.color : '';

  if (!Validator.isLength(data.quote, {min: 5, max: 200})) {
    errors.quote = 'Quote must be between 5 and 200 characters';
  }

  if (!Validator.isLength(data.author, {min: 5, max: 30})) {
    errors.author = 'Author must be between 5 and 30 characters';
  }

  if (Validator.isEmpty(data.quote)) {
    errors.quote = 'This field is required';
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = 'This field is required';
  }

  if (Validator.isEmpty(data.typo)) {
    errors.typo = 'This field is required';
  }

  if (Validator.isEmpty(data.color)) {
    errors.color = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
