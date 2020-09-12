/* IMPORTS */
const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');

const config = require('./config')
const db = require('./models');
const auth = require('./middlewares/auth');

/* START DB CONNECTION */
db.Mongoose
  .connect(config.db.uri, config.db.options)
  .then(_ => console.log('Mongo connection open to obard!') )
  .catch(err => console.error('Mongo failed to connect to obard! ' + err) 
);

/* CREATES AN EXPRESS APP */
const app = express();
const upload = multer();
const corsOptions = { origin: config.uri };

/* MIDDLEWARES TO RUN ON EVERY REQUEST TO THE SERVER */
app
  .use(cors(corsOptions) ) /* FOR PROVIDING ACCESS-CONTROL HEADERS VIA OPTIONS */
  .use(bodyParser.urlencoded( { extended: false } ) ) /* FOR PARSING FORM URL ENCODED DATA */
  .use(bodyParser.json() ) /* FOR PARSING APP/JSON DATA */
  .use(upload.array() ) /* FOR PARSING MULTIPART/FORM DATA */
  .use(express.static(path.join(__dirname, 'client', 'build') )) /* FOR SERVING STATIC FILES */
  .use(logger('dev') ) /* LOGGER */
;

/* MIDDLEWARE REQUEST TIME LOGGER FOR EVERY REQUEST MADE TO THE SERVER */
app.use('/booking', (req, res, next) => {
  console.log('New booking request received at ' + Date.now() );
  next();
});

/* ROUTE HANDLER THAT SENDS THE RESPONSE */
app.get('/booking', (req, res) => {
  res.send('booking');
});

app.post('/booking', (req, res) => {
  console.log(req.body);
  res.send('Recevied your booking request!');
});

if (process.env.NODE_ENV !== 'production') {
  console.log('Development');
  /* SERVES STATIC CONTENT FROM THE 'CLIENT', 'BUILD' DIRECTORY IN THE APP DIRECTORY */
  app.use(express.static(path.join(__dirname, 'client', 'build') ));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html') );
  });
};

/* ROUTE HANDLERS */
app
  .use('/auth', auth.optional, require('./routes/authRouter') )
  .use('/booking', auth.optional, require('./routes/bookingRouter') )
  .use('/payment', auth.required, require('./routes/paymentRouter') )
  .use(config.api.prefix, auth.required)
;

/* PROTECTED RESOURCE AUTH IS REQUIRED */
app.all(`${config.api.prefix}/*`, auth.required, (req, res, next) => {
  res.json('Protected resource!');
  /* USER SHOULD BE AUTHENTICATED REDIRECT TO LOGIN */
  res.redirect(301, '/auth/login');
  next();
})

/* MAIN ROUTE AUTH IS OPTIONAL */
app.get('/', auth.optional, (req, res, next) => {
  res.json('Hello World!');
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html') );
});

/* ERROR HANDLING MIDDLEWARE */
app.use( (err, req, res, next) => {
  console.error(err);
  console.log('Status: ', err.status);
  console.log('Message: ', err.message);
  console.log('Stack: ', err.stack);

  if (err.name === 'UnauthorizedError') {
    res.status(err.status);
  }
  return res.json({
    status: err.status,
    message: err.message,
    stack: err.stack
  })
});

/* STARTS SERVER CONNECTION */
app.listen(config.port, () => {   
  console.log(`Server is running on port: ${config.port}`);
});