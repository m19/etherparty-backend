var database = require('./database');

var user = {
  login: function (req, res, next) {
    database.validateUser(req.body.username, req.body.password, function (err, result) {
      if (err) {
        if (err === 'NO_USER' || err === 'WRONG_PASSWORD') {
          return res.render('login', {error: 'Wrong username or password'});
        }

        return res.render('login', {error: 'Error logging in'});
      }

      req.session.user = result;

      return res.redirect('/');
    });
  },

  register: function (req, res, next) {

  },

  logout: function (req, res, next) {
    if (req.session.user) {
      delete req.session.user;
    }
    return res.redirect('/login');
  }
};

module.exports = user;