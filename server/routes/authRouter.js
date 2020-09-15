/* IMPORTS */
const authRouter = require('express').Router();
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

/* AUTH ROUTES */
authRouter
  .post('/signup', userController.signup)
  .post('/login', userController.login)
  .get('/current-user', auth.authenticated, userController.currentUser)
  .get('/admin', auth.authenticated, auth.checkAdminRole, userController.authorization)
  .get('/admin/users', auth.authenticated, auth.checkAdminRole, userController.users)
  .post('/current-user/logout', auth.authenticated, userController.logout)
  .post('/current-user/logout-all', auth.authenticated, userController.logoutAll)
;

/* EXPORTS */
module.exports = authRouter;