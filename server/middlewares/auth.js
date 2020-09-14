/* IMPORTS */
const expressJwt = require('express-jwt');
const config = require('../config');
const db = require('../models');

/* EXPORTS */
module.exports = {
  required: expressJwt({
    secret: config.jwt.secret,
    algorithms: ['HS256'],
    /* ACCESS THIS PROPERTY USING 'REQ.TOKEN' */
    userProperty: 'token',
    /* IF SET TO TRUE THEN 'AUTH' IS REQUIRED */
    credentialsRequired: true,
    getToken: function (req) {
      if (req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer') {
        /* TOKEN IS SET AS A BEARER: 'TOKEN' IN THE REQUEST HEADER */
        return req.headers.authorization.split(' ')[1];
      }
      /* RETURN NULL IF NO TOKEN WAS FOUND */
      return null;
    }
  }),
  optional: expressJwt({
    secret: config.jwt.secret,
    algorithms: ['HS256'],
    userProperty: 'token',
    /* REQUEST WITHOUT A 'TOKEN' WILL STILL SUCCEED IF SET TO FALSE */
    credentialsRequired: false,
    getToken: function (req) {
      if (req.headers.authorization
        && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      }
      return null;
    }
  }),

  /* EXPRESS MIDDLEWARE TO VERIFY JWT TOKEN */
  authenticated: async (req, res, next) => {
    try {
      /* EXTRACT THE JWT 'TOKEN' FROM THE REQUEST HEADER */
      const token = req.header('Authorization').replace('Bearer ', '');
      /* THE JWT 'VERIFY' FUNCTION HELPS TO DECODE THE TOKEN */
      const decoded = jwt.verify(token, config.jwt.secret);
      const user = await db.User.findOne({
        _id: decoded._id,
        'tokens.token': token
      });
      console.log("\nJWT verification result: " + JSON.stringify(decoded) );
      
      req.token = token;
      req.user = user;
      /* IF SUCCESSFUL, PASS IT OFF TO THE NEXT FUNCTION FOR EXECUTION */
      next();
      /* ANY ERRORS THROWN WILL WIND UP IN THE CATCH BLOCK */
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "You're not authorized to access this resource! Please login."
      })
    }
  },

  /* CHECKS TO SEE IF THE USER IS AN ADMIN USER */
  checkAdminRole: async (req, res, next) => {
    try {
      const { role } = req.user;
      const user = await db.User.findOne({ role })
      console.log('ADMIN ROLE?');
      if (role !== 'admin') {
        return res.sendStatus(403);
      } 
      req.user = user;
      return next();
    } 
    catch (err) {
      console.error(err);
      res.redirect('/login');
    }
  }
};