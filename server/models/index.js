const mongoose = require('mongoose');

const db = {};

db.Mongoose = mongoose;
db.User = require('./user');
db.Booking = require('./booking');

module.exports = db;