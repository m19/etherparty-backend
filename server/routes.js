var express = require('express');
var router = express.Router();
var user = require('./user');

function restrict (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

router.get('/', restrict, function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', user.login);
router.get('/logout', user.logout);

module.exports = router;
