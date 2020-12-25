const { promisify } = require('util');

const User = require('../models/User');
const AppError = require('../utills/appError');
const catchAsync = require('../utills/catchAsync');

const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const createJwtToken = (user, statusCode, req, res) => {
  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(payload, config.get('JWT_SECRET'), {
    expiresIn: config.get('JWT_EXPIRES_IN'),
  });

  // http only cookie to store jwt token
  const cookieOptions = {
    sameSite: 'strict',
    path: '/',
    expires: new Date(
      Date.now() + config.get('JWT_COOKIE_EXPIRES_IN') * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  res.status(statusCode).cookie('jwt', token, cookieOptions).json({
    status: 'success',
    token,
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  const xAuth = req.header('x-auth-token');
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  } else if (xAuth) {
    token = xAuth;
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('No tokn, authoriztion declined!', 401));
  }

  const verify = promisify(jwt.verify);
  const decoded = await verify(token, config.get('JWT_SECRET'));

  const currentUser = await User.findById(decoded.user.id);
  if (!currentUser) {
    return next(
      new AppError('User belonging to this token does not exist anymore!', 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.signUp = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    avatar,
    password: hashedPassword,
  });

  createJwtToken(user, 201, req, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid Credentials!, 400'));
  }
  createJwtToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  // res.cookie('jwt', 'loggedOut', {
  //   expires: new Date(Date.now() + 10 * 1000), // 10 sec expiration
  //   httpOnly: true,
  // });
  res.status(200).clearCookie('jwt').json({ status: 'success' });
});
