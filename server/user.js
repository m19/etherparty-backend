var validator = require('validator');
var database = require('./database');

var user = {
  login: function (req, res, next) {
    database.validateUser(req.body.username, req.body.password, function (err, result) {
      if (err) {
        var error = 'Error logging in';
        if (err === 'NO_USER' || err === 'WRONG_PASSWORD') {
          error = 'Wrong username or password';
        }

        if (err === 'NOT_ACTIVATED') {
          error = 'User not activated';
        }

        return res.render('login', {
          error: error,
          loginToggled: 'toggled',
          layout: false
        });
      }

      req.session.user = result;

      return res.redirect('/');
    });
  },

  register: function (req, res, next) {
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password.trim();

    var validationErrors = [];

    if (!validator.isAlphanumeric(username)) {
      validationErrors.push('Username should be alphanumeric');
    }

    if (!validator.isEmail(email)) {
      validationErrors.push('Invalid email');
    }

    if (password.length < 6) {
      validationErrors.push('Password should be at least 6 characters');
    }

    if (validationErrors.length) {
      return res.render('login', {
        validationErrors: validationErrors,
        registerToggled: 'toggled',
        layout: false
      });
    }

    database.createUser(username, email, password, function (err) {
      if (err) {
        var registerError = 'Error registering';
        if (err === 'USERNAME_TAKEN') {
          registerError = 'Username already in use';
        }
        if (err === 'EMAIL_TAKEN') {
          registerError = 'Email already in use';
        }

        return res.render('login', {
          registerError: registerError,
          registerToggled: 'toggled',
          layout: false
        });
      }

      return res.render('login', {
        registerSuccess: 'Successfully registered account. Check your email.',
        registerToggled: 'toggled',
        layout: false
      });
    });
  },

  logout: function (req, res, next) {
    if (req.session.user) {
      delete req.session.user;
    }
    return res.redirect('/login');
  },

  activate: function (req, res, next) {
    var token = req.params.token;

    database.activateUser(token, function (err, result) {
      if (err) {
        if (err === 'NO_USER') {
          req.flash('error', 'Invalid token.');
        }

        if (err === 'ALREADY_ACTIVATED') {
          req.flash('error', 'User already activated.');
        }

        return res.redirect('/login');
      } else {
        req.flash('success', 'Successfully activated account.');
        return res.redirect('/login');
      }
    });
  }
};

module.exports = user;