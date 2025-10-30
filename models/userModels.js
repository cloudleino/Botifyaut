const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, sparse: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional for Google users
    role: {
      type: String,
      enum: ['admin', 'manager', 'robot', 'cooker', 'user'],
      default: 'user'
    },
    googleId: { type: String, unique: true, sparse: true }, // for Google OAuth2 users
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
