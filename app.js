const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const AppError = require('./utills/appError');

// @desc start a new expresss app
const app = express();

// @desc parse body middlware
app.use(express.json({ extended: false }));

// @cookie parser
app.use(cookieParser());

// #desc implement cors
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://192.168.100.122'],
  })
);
/* 
app.use((req, res, next) => {
  console.log(req.signedCookies);
  console.log('cookie=', req.cookies);
  next();
}); */

// @desc Define Routes
app.use('/api/v1', require('./routes/api/authRoutes'));
app.use('/api/v1/users', require('./routes/api/usersRoutes'));
app.use('/api/v1/profiles', require('./routes/api/profileRoutes'));
app.use('/api/v1/posts', require('./routes/api/postsRoutes'));

// Serve static assets in the production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.js'));
  });
}

// @desc Unimplemented route handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

// @desc error handling middleware
app.use(require('./controllers/errorController'));

module.exports = app;
