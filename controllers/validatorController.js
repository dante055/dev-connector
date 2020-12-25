const { body, validationResult } = require('express-validator');

exports.signUpValidationRules = () => {
  return [
    body('name', 'Name is required!').trim().not().isEmpty(),
    body('email', 'Please provide a valid email!').isEmail().normalizeEmail(),
    body(
      'password',
      'Please enter a password with 8 or more characters!'
    ).isLength({ min: 8 }),
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ];
};

exports.logInValidationRules = () => {
  return [
    body('email', 'Please provide a valid email!').isEmail().normalizeEmail(),
    body('password', 'Password is required!').exists(),
  ];
};

exports.createUserProfileRules = () => {
  return [
    body('status', 'Status is required!').trim().not().isEmpty(),
    body('skills', 'Skills is required!').trim().not().isEmpty(),
  ];
};

exports.addEducationRules = () => {
  return [
    body('school', 'School is required!').trim().not().isEmpty(),
    body('degree', 'Degree is required!').trim().not().isEmpty(),
    body('from', 'From date is required!').not().isEmpty(),
  ];
};

exports.addExperienceRules = () => {
  return [
    body('title', 'Title is required!').trim().not().isEmpty(),
    body('company', 'Company is required!').trim().not().isEmpty(),
    body('from', 'From date is required!').not().isEmpty(),
  ];
};

exports.addPostOrCommentRules = () => {
  return [body('text', 'Text is required!').trim().not().isEmpty()];
};

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorObj = {
    name: 'ValidationError',
    errors: errors.array(),
  };
  return next(errorObj);
};
