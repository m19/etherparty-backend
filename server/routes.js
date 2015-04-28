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
  res.render('index', {path: req.path});
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    error: req.flash('error'),
    success: req.flash('success'),
    loginToggled: 'toggled',
    layout: false
  });
});

router.get('/register', function (req, res, next) {
  res.redirect('login');
});

router.post('/login', user.login);
router.post('/register', user.register);
router.get('/logout', user.logout);

router.get('/activate/:token', user.activate);

router.post('/payment', restrict, user.payment);

module.exports = router;
