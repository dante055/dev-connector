const express = require('express');
const validatorController = require('../../controllers/validatorController');
const authController = require('../../controllers/authController');

const router = express.Router();

// @route   POST api/v1/signup
// @desc    Register user
// @access  Public
router.post(
  '/signup',
  validatorController.signUpValidationRules(),
  validatorController.validate,
  authController.signUp
);

// @route   GET api/v1/login
// @desc    login
// @access  Public
router.post(
  '/login',
  validatorController.logInValidationRules(),
  validatorController.validate,
  authController.logIn
);

// @route   GET api/v1/logout
// @desc    login
// @access  Public
router.post('/logout', authController.protect, authController.logout);

module.exports = router;
