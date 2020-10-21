/* IMPORTS */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const { Schema } = mongoose;
const saltRounds = 10;

/* DEFINE USER SCHEMA */
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be blank'],
    match: [/^[a-zA-Z0-9]+$/, 'No special characters allowed'],
    index: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email Address cannot be blank'],
    match: [/\S+@\S+\.\S+/, 'Invalid Email Address'],
    index: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank'],
    minlength: 5
  },
  firstName: {
    type: String,
    required: [true, 'First Name cannot be blank'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last Name cannot be blank'],
    trim: true
  },
  role: {
    type: [{
      type: String,
      required: true,
      enum: ['user', 'admin']
    }],
    default: ['user']
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  bookings: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
      default: []
    }
  }]
}, { timestamps: true } );

/* PRE-SAVED HOOK */
/* HASHING THE PASSWORD BEFORE SAVING TO THE DB */
userSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password') ) return next;
    const salt = await bcrypt.genSalt(saltRounds);
    // console.log(`SALT: ${salt}`);
    
    // HASH THE PASSWORD BEFORE SAVING THE USER TO THE DB
    user.password = await bcrypt.hash(user.password, salt);
    // console.log(`HASH: ${user.password}`);
    next();
});

/* METHOD TO GENERATE JWT TOKEN (SIGN AND VERFY) */
userSchema.methods.generateJwt = async function () {
  const user = this;

  const token = jwt.sign({
    _id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  }, config.jwt.secret, {
    expiresIn: '1h'
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

/* IF USER EXISTS THEN COMPARE THEIR PASSWORD WITH THE STORED PASSWORD */
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
    if (!user) {
      throw new Error({
        message: 'Username or password are incorrect!'
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error({ 
        message: 'Username or password are incorrect!' 
    });
  }
  return user;
};

/* METHOD FOR REMOVING THE PASSWORD BEFORE SAVING IT */
userSchema.methods.withoutPassword = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

/* EXPORTS */
module.exports = User;