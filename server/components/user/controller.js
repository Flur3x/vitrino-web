let express = require('express');
let passport = require('passport');

let authHelper = require('../../helpers/auth.js');
let User = require('./User.js');

let router = express.Router();


// Signup

router.get('/signup', function(req, res) {
  res.render('signup.html', {
    csrfToken: req.csrfToken()
  });
});

router.post('/signup', (req, res, next)  => {
  User.create(req.body.email, req.body.password)
    .then(() => {
      next();
    })
    .catch((err) => {
      // console.error(err.stack);
      handleResponse(res, 500, 'error');
    });
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));


// Login / Logout

router.get('/login', function(req, res) {
  res.render('login.html', {
    csrfToken: req.csrfToken()
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


// Edit user profile

router.get('/edit', authHelper.ensureAuthenticated, function (req, res) {
  res.render('edit.html', {
    csrfToken: req.csrfToken()
  });
});

router.post('/edit', authHelper.ensureAuthenticated, function (req, res, next) {
  let newPassword = req.body.newPassword;
  let newPasswordConfirm = req.body.newPasswordConfirm;

  if (newPassword !== newPasswordConfirm) {
    req.flash("error", "Die Wiederholung des Passworts stimmt nicht mit der ersten Eingabe überein.");
    return res.redirect('/edit');
  }

  // TODO - to be replaced with new knex queries/user model
  // req.user.password = newPassword;
  //req.user.save(function(err) {
  //
  //  if (err) {
  //    next(err);
  //    return;
  //  }
  //
  //  req.flash("info", "Dein Profil wurde erfolgreich gespeichert!");
  //  res.redirect('/edit');
  //});
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
