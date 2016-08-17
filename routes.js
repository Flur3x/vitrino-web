let express = require('express');
let passport = require('passport');
let router = express.Router();

let User = require("./server/models/user");

router.use(function(req, res, next) {
  "use strict";
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

router.get('/', function(req, res) {
  'use strict';
  res.render('index.html', {
    page_title: 'Startseite',
    port: router.get('port')
  });
});

router.get('/signup', function(req, res) {
  "use strict";
  res.render('signup.html', {
    page_title: 'Registrieren'
  });
});

router.post('/signup', function(req, res, next) {
  "use strict";
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username }, function(err, user) {

    if (err) {
      return next(err);
    }

    if (user) {
      req.flash('error', 'User already exists');
      return res.redirect('/signup');
    }

    let newUser = new User({
      username: username,
      password: password
    });

    newUser.save(next);
  });
}, passport.authenticate("local-login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));

router.get('/login', function(req, res) {
  'use strict';
  res.render('login.html', {
    page_title: 'Einloggen',
    port: router.get('port')
  });
});

//router.get('/users', function(req, res, next) {
//  "use strict";
//  User.find()
//    .sort({createdAt: "descending" })
//    .exec(function(err, users) {
//      if (err) {
//        return next (err);
//      }
//      res.render("userlist.html", {
//        users: users
//      });
//    });
//});

module.exports = router;