/* IMPORTS */
const mongoose = require('mongoose');

const { Schema } = mongoose;

/* DEFINE BOOKING SCHEMA */
const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: [true, 'First Name cannot be blank']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name cannot be blank']
  },
  email: {
    type: String,
    required: [true, 'Email Address cannot be blank'],
    match: [/\S+@\S+\.\S+/, 'Invalid Email Address'],
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone Number cannot be blank'],
    match: [/\d{3}-\d{3}-\d{4}/, 'Invalid Phone Number']
  },
  bookingAddressLine1: {
    type: String,
    required: [true, 'Address cannot be blank']
  },
  bookingAddressLine2: String,
  city: {
    type: String,
    required: [true, 'City cannot be blank']
  },
  state: {
    type: String,
    required: [true, 'State canot be blank']
  },
  zip: {
    type: String,
    required: [true, 'Zipcode cannot be blank'],
    min: 5
  },
  pilotLicenseNumber: {
    type: String,
    required: [true, 'Pilot License Number cannot be blank']
  },
  refunded: {
    type: Boolean,
    required: true,
    default: false,
  }
}, { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } });

/* METHOD TO SET THE USERS FULL NAME */
bookingSchema.virtual('fullName').set(function(name) {
  let str = name.split(' ');

  this.firstName = str[0];
  this.lastName = str[1];
});

const Booking = mongoose.model('Booking', bookingSchema);

/* EXPORTS */
module.exports = Booking;