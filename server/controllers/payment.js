/* IMPORTS */
const config = require('../config');
const stripe = require('stripe')(
  config.stripe.secret_key || config.stripe.test_key
);

/* MIDDLWARE FUNCTIONS POST REQUEST */
exports.postHandler = async (req, res) => {
  try {
    const { amount, source, receipt_email } = req.body;
    let status = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
      receipt_email
    });
    if (!status) throw new Error('Charge was unsuccessful!');
    console.log('post successful?');
    return res.json({ status });
    /* UPDATE USER OBJECT TO INCLIDE BOOKINGS */
  } 
  catch (err) {
    console.error(err);
    res.status(500).end();
  };
};

exports.allHandler = (_, res) => res.json({
  message: 'Please make a POST request to /charge!'
});