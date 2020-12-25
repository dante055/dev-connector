const express = require('express');
const validatorController = require('../../controllers/validatorController');
const authController = require('../../controllers/authController');
const profileController = require('../../controllers/profileController');

const router = express.Router();

// @route   POST api/v1/profiles
// @desc    Create and update a currently logged in user profile
// @access  Private
router.post(
  '/',
  authController.protect,
  validatorController.createUserProfileRules(),
  validatorController.validate,
  profileController.createUserProfile
);

// @route   POST api/v1/profiles/addEducation
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  authController.protect,
  validatorController.addExperienceRules(),
  validatorController.validate,
  profileController.addUserExperienceOrEnducaion('experience')
);

// @route   DELETE api/v1/profiles/experience/:experinceId
// @desc    Delete experience
// @access  Private
router.delete(
  '/experience/:id',
  authController.protect,
  profileController.deleteUserExperienceOrEcucation('experience')
);

// @route   UPDATE api/v1/profiles/experience/:exId
// @desc    Update a experience
// @access  Private
router.patch(
  '/experience/:id',
  authController.protect,
  profileController.updateUserExperienceOrEducation('experience')
);

// @route   POST api/v1/profiles/education
// @desc    Add experience to profile
// @access  Private
router.post(
  '/education',
  authController.protect,
  validatorController.addEducationRules(),
  validatorController.validate,
  profileController.addUserExperienceOrEnducaion('education')
);

// @route   DELETE api/v1/profiles/education.:educationId
// @desc    Delete Education
// @access  Private
router.delete(
  '/education/:id',
  authController.protect,
  profileController.deleteUserExperienceOrEcucation('education')
);

// @route   UPDATE api/v1/profiles/education/:exId
// @desc    Update a Education
// @access  Private
router.patch(
  '/education/:id',
  authController.protect,
  profileController.updateUserExperienceOrEducation('education')
);

// @route   GET api/v1/profiles/my
// @desc    Get current user profile
// @access  Public
router.get(
  '/my',
  authController.protect,
  profileController.getCurrentUserProfile
);

// @route   GET api/v1/profiles/
// @desc    Get all profile
// @access  Public
router.get('/', profileController.getAllProfiles);

// @route   GET api/v1/profiles/user/:userId
// @desc    Get pofile by id
// @access  Public
router.get('/user/:userId', profileController.getProfileById('userId'));

// @route   GET api/v1/profile/:profileId
// @desc    Get pofile by id
// @access  Public
router.get('/:profileId', profileController.getProfileById('profileId'));

// @route   GET api/v1/profiles/githut/:username
// @desc    Get gitub profile of a user
// @access  Public
router.get('/github/:username', profileController.getGitHubAccount);

module.exports = router;
