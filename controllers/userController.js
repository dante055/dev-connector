const User = require('../models/User');
const Post = require('../models/Post');
const Profile = require('../models/Profile');
const catchAsync = require('../utills/catchAsync');

exports.getUser = async (req, res) => {
  try {
    // const user = await User.findById(req.user);
    res.json({ status: 'success', user: req.user });
  } catch (err) {
    console.log(err);
    let statusCode = 500;
    let message = `Something went wrong! Please try again later!`;
    res.status(statusCode).json({ status: 'fail', errors: [{ msg: message }] });
  }
};

// PERMANENTLY DELETE THE ACCOUNT
exports.deleteLoggedInUserAccount = catchAsync(async (req, res, next) => {
  // delete all the post of the users
  await Post.deleteMany({ user: req.user.id });

  // delete the profile
  await Profile.findOneAndDelete({ user: req.user.id });

  // delete user
  await User.findOneAndDelete({ _id: req.user.id });

  res.status(204).clearCookie('jwt').json({
    status: 'success',
    data: null,
  });
});
