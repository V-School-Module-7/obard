/* IMPORTS */
const router = require('express').Router();
const paymentController = require('../controllers/payment');

/* PAYMENT ROUTES */
router
  .post('/', paymentController.postHandler)
  .all('*', paymentController.allHandler)
;

/* EXPORTS */
module.exports = router;