/* IMPORTS */
const db = require('../models');

/* CREATES A NEW BOOKING REQUEST */
exports.createBooking = async (req, res) => {
  const booking = new db.Booking(req.body);
  /* SAVES THE BOOKING */
  await booking.save()
    .then(savedBooking => {
      console.log('Booking saved successfully!');
      res.status(201).json(savedBooking);
    })
    .catch(err => {
      console.error(err);
      res.status(400).json({
      message: err.message || 'Failed to save booking!'
    });
  })
};

/* FETCHES A SINGLE BOOKING BY ID */
exports.findBookingById = async (req, res) => {
  const id = req.params.id;
  await db.Booking.findById(id)
    .then(booking => {
      console.log('BOOKING: ', booking);
      if (!booking)
        res.status(404).json({ 
        message: 'No booking request found by that ID'
      })
      else res.status(200).json(booking);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ 
      message: err.message || 'Error retrieving booking request!'
    });
  })
};

/* FETCHES ALL THE DOCUMENTS FROM THE BOOKINGS COLLECTION */
exports.findBookings = async (req, res) => {
  const { firstName, lastName } = req.body;
  const condition = firstName + lastName ? {
    fullName: { 
      $regex: new RegExp(fullName), 
      $options: 'i' 
    }
  } : {};
  await db.Booking.find(condition)
    .then(docs => {
      console.log('DOCS: ', docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
      message: err.message || 'Failed to retrieve bookings!'
    });
  })
};

/* FETCHES ALL BOOKINGS */
exports.findAllBookings = async (req, res) => {
  await db.Booking.find({}).exec()
    .then(docs => {
      console.log('DOCS: ', docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
      message: err.message || 'Failed to retrieve booking requests!'
    });
  })
};

/* FETCHES CUSTOMTER REFUNDS */
exports.findAllRefunds = async (req, res) => {
  await db.Booking.find({ refunded: true })
    .then(data => {
      console.log('REFUNDS: ', data);
      res.status(200).json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
      message: err.message || 'Failed to retrieve customer refunds!'
    });
  })
};

/* FINDS AVAILABLE TIMESLOTS FOR ANY GIVEN DAY */
exports.searchAvailability = async (req, res) => {
  console.log('query started');
  try {
    await db.Booking.findOne({ 
      startDate: req.query.startDate, 
      endDate: req.query.endDate
    }, (err, booking) => {
      if (booking === null) {
        res.json('Available');
      } 
      else if (booking !== null) {
        res.json('Unavailable');
      };
    });
  } catch (err) {
    console.error(err);
  };
};

/* UPDATES A SINGLE BOOKING REQUEST BY ID */
exports.updateBooking = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Data to update cannot be empty!'
    });
  }
  const id = req.params.id;
    await db.Booking.findByIdAndUpdate(id, req.body)
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update booking with id: ${id}. No record found!`
        });
      } 
      else res.json({ message: 'Booking was updated successfully!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
      message: err.message || 'Error in updating booking with id: ' + id
    });
  })
};

/* DELETES A SINGLE BOOKING WITH THE SPECIFIED ID IN THE REQUEST */
exports.deleteBooking = async (req, res) => {
  const id = req.params.id;
  await db.Booking.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete booking with id: ${id}. No record found!`
        });
      } 
      else {
        res.json({
          message: `Booking with id: ${id} removed!`
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
      message: err.message || `Error in deleting booking id: ${id}`
    });
  })
};

/* REMOVES ALL BOOKINGS FROM THE DATABASE */
exports.deleteAllBookings = async (req, res) => {
  await db.Booking.deleteMany({})
    .then(data => {
      res.json({
        message: `${data.deletedCount} Bookings were removed successfully!`
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
      message: err.message || 'Some error occured while removing all bookings!' 
    });
  })
};