const authRouter = require('./authRouter');
const bookingRouter = require('./bookingRouter');
const paymentRouter = require('./paymentRouter');

module.exports = router => {
  authRouter(router),
  bookingRouter(router),
  paymentRouter(router)
};