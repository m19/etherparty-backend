var database = require('./database');

var user = {
  login: function (req, res, next) {
    database.validateUser(req.body.username, req.body.password, function (err, result) {
      if (err) {
        if (err === 'NO_USER' || err === 'WRONG_PASSWORD') {
          return res.render('login', {
            error: 'Wrong username or password',
            loginToggled: 'toggled'
          });
        }

        return res.render('login', {
          error: 'Error logging in',
          loginToggled: 'toggled'
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
        if (err === 'USERNAME_TAKEN') {
          return res.render('login', {
            registerError: 'Username already used',
            registerToggled: 'toggled'
          });
        }
        if (err === 'EMAIL_TAKEN') {
          return res.render('login', {
            registerError: 'Email already used',
            registerToggled: 'toggled'
          });
        }

        return res.render('login', {
          registerError: 'Error registering',
          registerToggled: 'toggled'
        });
      }

      return res.render('login', {
        registerSuccess: 'Successfully registered account. Check your email.',
        registerToggled: 'toggled'
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