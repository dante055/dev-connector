const Profile = require('../models/Profile');
const AppError = require('../utills/appError');
const catchAsync = require('../utills/catchAsync');
const axios = require('axios');
const config = require('config');

const filterSubDoc = (type, subDoc, req) => {
  if (type === 'experience') {
    if (req.body.title) subDoc.title = req.body.title;
    if (req.body.company) subDoc.company = req.body.company;
    if (req.body.location) subDoc.location = req.body.location;
  } else if (type === 'education') {
    if (req.body.school) subDoc.school = req.body.school;
    if (req.body.degree) subDoc.degree = req.body.degree;
    if (req.body.fieldofstudy) subDoc.fieldofstudy = req.body.fieldofstudy;
  }

  if (req.body.from) subDoc.from = req.body.from;
  if (req.body.to) subDoc.to = req.body.to;
  if (req.body.current) subDoc.current = req.body.current;
  if (req.body.description) subDoc.description = req.body.description;

  return subDoc;
};

// create and edit
exports.createUserProfile = catchAsync(async (req, res, next) => {
  // Get fields
  const profileFields = {};
  profileFields.social = {};
  profileFields.user = req.user.id;

  ['company', 'website', 'location', 'bio', 'status', 'githubusername'].forEach(
    field => {
      if (field in req.body) profileFields[field] = req.body[field];
    }
  );

  ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'].forEach(field => {
    if (field in req.body) profileFields.social[field] = req.body[field];
  });

  // Skills - Spilt into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills
      .split(',')
      .map(skill => skill.trim());
  }

  let profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    profileFields,
    { new: true, runValidators: true }
  ).populate({
    path: 'user',
    select: ['name', 'avatar'],
  });

  if (!profile) profile = await Profile.create(profileFields);

  res.status(201).json({ status: 'success', profile });
});

exports.addUserExperienceOrEnducaion = type => {
  return catchAsync(async (req, res, next) => {
    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return next(
        new AppError(
          `There is no profile present for this user! First create a profile then add ${type}!`,
          404
        )
      );
    }
    let subDocArr = profile[type];
    let subDoc = filterSubDoc(type, {}, req);

    subDocArr.unshift(subDoc);

    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { [type]: subDocArr },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({ status: 'success', profile });
  });
};

exports.getCurrentUserProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate({
    path: 'user',
    select: ['name', 'avatar'],
  });

  if (!profile) {
    return next(new AppError('There is no profie for this user!', 404));
  }

  res.json({
    status: 'success',
    profile,
  });
});

exports.getAllProfiles = catchAsync(async (req, res, next) => {
  const profiles = await Profile.find().populate('user', ['name', 'avatar']);

  if (!profiles.length) {
    return next(new AppError('There is no profie present!', 404));
  }

  res.json({
    status: 'success',
    result: profiles.length,
    profiles,
  });
});

exports.getProfileById = type => {
  return catchAsync(async (req, res, next) => {
    let query;
    if (type === 'userId')
      query = Profile.findOne({
        user: req.params.userId,
      });
    else if (type === 'profileId')
      query = Profile.findById(req.params.profileId);

    const profile = await query.populate('user', ['name', 'avatar']);

    if (!profile) {
      return next(
        new AppError(
          type === 'userId'
            ? 'There is no profile for this user!'
            : 'There is no profile present with this id!',
          404
        )
      );
    }

    res.json({
      status: 'success',
      profile,
    });
  });
};

exports.deleteUserExperienceOrEcucation = type => {
  return catchAsync(async (req, res, next) => {
    const field = `${type}._id`;
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id, [field]: req.params.id },
      {
        $pull: {
          [type]: { _id: req.params.id },
        },
      },
      {
        new: true,
      }
    );

    if (!profile) {
      return next(
        new AppError(
          `There is no ${type} with this id present for this user!`,
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      profile,
    });
    // res.status(204).json({
    //   status: 'success',
    //   data: null,
    // });
  });
};

exports.updateUserExperienceOrEducation = type => {
  return catchAsync(async (req, res, next) => {
    let profile = await Profile.findOne({ user: req.user.id });
    const subDoc = profile[type].id(req.params.id);

    if (!profile) {
      return next(
        new AppError(
          `There is no ${type} with this id present for this user!`,
          404
        )
      );
    }

    const newSubDoc = filterSubDoc(type, subDoc, req);

    profile[type].forEach((obj, index) => {
      if (obj._id.toString() === req.params.id) {
        profile[type][index] = newSubDoc;
        return;
      }
    });

    await profile.save();

    res.json({
      status: 'success',
      profile,
    });
  });
};

exports.getGitHubAccount = catchAsync(async (req, res, next) => {
  try {
    const uri = `https://api.github.com/users/${
      req.params.username
    }/repos?per_page=5&sort=created:asc&client_id=${config.get(
      'GITHUB_CLIENT_ID'
    )}&client_secret=${'GITHUB_CLIENT_SECRET'}`;

    const result = await axios.get(uri);

    res.status(200).json({
      status: 'success',
      result: result.data.length,
      repos: result.data,
    });
  } catch (error) {
    console.log(error);
    let msg =
      error.response.status === 404
        ? 'No Github profile found for this username!'
        : error.response.statusText;
    return next(new AppError(msg, error.response.status));
  }
});
