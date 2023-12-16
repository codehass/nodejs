const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    validate: {
      //This only works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  // only run this function if the password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the password confirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
