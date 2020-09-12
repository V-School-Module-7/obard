/* IMPORTS */
const bookingRouter = require('express').Router();
const bookingController = require('../controllers/booking');
const auth = require('../middlewares/auth');

/* BOOKING ROUTES */
bookingRouter
  .post('/', bookingController.createBooking)
  .get('/current-user', auth.authenticated, bookingController.findBookings)
  .get('/bookings/:id', bookingController.findBookingById)
  .get('/all-bookings', bookingController.findAllBookings)
  .get('/schedule-booking', bookingController.searchAvailability)
  .get('/admin/refunds', auth.checkAdminRole, auth.authenticated, bookingController.findAllRefunds)
  .put('/current-user/:id/update', auth.authenticated, bookingController.updateBooking)
  .delete('/current-user/:id/delete', auth.authenticated, bookingController.deleteBooking)
  .delete('/admin/bookings', auth.checkAdminRole, auth.authenticated, bookingController.deleteAllBookings)
;

/* EXPORTS */
module.exports = bookingRouter;