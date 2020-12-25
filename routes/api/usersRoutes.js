const express = require('express');
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');

const router = express.Router();

// @route   GET api/v1/users/me
// @desc    Get the logged in user detatails
// @access  Private
router.get('/me', authController.protect, userController.getUser);

// @route   DELETE api/v1/users/me
// @desc    Delete you own accout permanently
// @access  Private
router.delete(
  '/me',
  authController.protect,
  userController.deleteLoggedInUserAccount
);

module.exports = router;
