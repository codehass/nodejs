const mongoose = require('mongoose');
const validator = require('validator');

// name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please proved your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please proved a valid email!'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please proved a password!'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
