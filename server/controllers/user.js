const db = require('../models');

/* AUTHORIZATION REQUEST HANDLER  */
exports.authorization = async (req, res) => {
  await res.sendStatus(200).json({
    _id: req.user._id, /* CHECKS IF A USER IS AUTHORIZED TO ACCESS OR NOT */
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true, /* CHECKS IF A USER IS LOGGED IN OR NOT */
    email: req.user.email,
    username: req.user.username,
    role: req.user.role
  })
};

/* SIGNUP REQUEST HANDLER ADDS A NEW USER TO THE USERS COLLECTION */
exports.signup = async (req, res, next) => {
  try {
    const { username } = req.body;
    /* DOES THE USER ALREADY EXIST IN THE DB */
    let user = await db.User.findOne({ username });
    if (user) {
      res.status(400);
      return next(new Error('That username is already taken!') );
    }
    /* IF THE USER DOESN'T EXIST, CREATE AND SAVE USER TO THE DB */
    user = new db.User({ ...req.body });
    await user.save();
    /* GENERATE A TOKEN FOR THE USER */
    const token = await user.generateJwt();
    /* SEND BACK THE RESPONSE */
    res.status(201).json({ 
      success: true, 
      user: user.withoutPassword(), 
      token 
    });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

/* LOGIN REQUEST HANDLER */
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    /* FINDS THE USER AND COMPARES THEIR PASSWORD WITH THE STORED PASSWORD */
    const user = await db.User.findByCredentials(username, password)
    if (!user) {
      res.status(400);
      return next(new Error('Username or password are incorrect!') );
    };
    /* GENERATE A TOKEN FOR THE USER */
    const token = await user.generateJwt();
    /* SEND BACK THE RESPONSE */
    res.status(200).json({ 
      success: true,
      user: user.withoutPassword(), 
      token 
    });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

/* FETCHES THE CURRENT USER */
exports.currentUser = async (req, res) => {
  try {
    const user = await db.User.findById(req.user._id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

/* FETCHES ALL USERS */
exports.users = async (req, res, next) => {
  await db.User.find({}).exec( (err, docs) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).json({ 
      users: docs, 
      currentUser: req.user 
    });
  })
};

/* LOGOUT THE CURRENT USER */
exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter( (token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

/* LOGS OUT THE CURRENT USER FROM ALL THEIR DEVICES */
exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};