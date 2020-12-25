const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      //   required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'users',
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('User', UserSchema);
