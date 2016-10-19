let express = require('express');
let passport = require('passport');

let config = require('../../../config/config.js');
let authHelper = require('../../helpers/auth.js');
let User = require('./User.js');
let sendgrid = require('../../services/sendgrid.js');

let router = express.Router();


// --- Signup and E-Mail verification

router.get('/signup', function (req, res) {
  res.render('signup.html', {
    csrfToken: req.csrfToken()
  });
});

router.post('/signup', (req, res, next)  => {
  User.create(req.body.email, req.body.password)
    .then((user) => {
      sendgrid.sendToken(user[0].email, user[0].auth_token);
      next();
    })
    .catch((err) => {
      console.error(err.stack);
    });
}, passport.authenticate('local', config.passport));

router.get('/verify_email/:token', function (req,res) {
  User.verifyEmail(req.params.token)
    .then((user) => {
      res.render('verify.html', {
        status: 'Erfolgreich! :)'
      });
    })
    .catch((err) => {
      console.error(err);
      res.render('verify.html', {
        status: 'Fehler :('
      });
  });
});


// --- Login / Logout

router.get('/login', function (req, res) {
  res.render('login.html', {
    csrfToken: req.csrfToken()
  });
});

router.post('/login', passport.authenticate('local', config.passport));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


// --- Password forgotten

router.get('/forgot', function (req, res) {
  res.render('forgotPassword.html', {
    csrfToken: req.csrfToken()
  });
});

router.post('/forgot', function (req, res) {
  User.findByEmail(req.body.email)
    .then((user) => {
      let token = authHelper.generateToken(user.email);

      User.setResetPasswordExpiration(user.id, token)
        .then((user) => {
          sendgrid.sendResetPasswordLink(user[0].email, user[0].pw_reset_token);
          req.flash('success', 'Wir haben dir eine E-Mail mit einem Link zugesandt, mit welchem du dein Passwort zurücksetzen kannst.');
          return res.redirect('/');
        })
        .catch((err) => {
          req.flash('error', 'Etwas scheint schiefgelaufen zu sein.');
          return res.redirect('/');
        });
    })
    .catch((err) => {
      console.error(err);
      req.flash('error', 'Es konnte kein Benutzer mit dieser E-Mail gefunden werden.');
      return res.redirect('/forgot');
    });
});

router.get('/reset/:token', function (req, res) {
  User.findUserWithValidResetToken(req.params.token)
    .then((user) => {
      if (user) {
        res.render('resetPassword.html', {
          resetToken: req.params.token,
          csrfToken: req.csrfToken()
        });
      } else {
        req.flash('error', 'Der Link zum Zurücksetzen des Passworts ist ungültig oder abgelaufen.');
        return res.redirect('/forgot');
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post('/reset/:token', function (req, res, next) {
  User.findUserWithValidResetToken(req.params.token)
    .then((user) => {
      let newPassword = req.body.newPassword;
      let newPasswordConfirm = req.body.newPasswordConfirm;

      if (newPassword !== newPasswordConfirm) {
        req.flash("error", "Die Wiederholung des Passworts stimmt nicht mit der ersten Eingabe überein.");
        return res.redirect('/reset/' + req.params.token);
      }

      User.updatePassword(user.id, newPassword)
      .then((user) => {
        req.body.email = user[0].email;
        req.body.password = newPassword;

          req.flash("success", "Passwort erfolgreich geändert!");
          next();
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}, passport.authenticate('local', config.passport));

module.exports = router;
