var database = require('./database');

var user = {
  login: function (req, res, next) {
    database.validateUser(req.body.username, req.body.password, function (err, result) {
      if (err) {
        var error = 'Error logging in';
        if (err === 'NO_USER' || err === 'WRONG_PASSWORD') {
          error = 'Wrong username or password';
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
  }
};

module.exports = user;