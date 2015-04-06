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

router.get('/create', restrict, function (req, res, next) {
  res.render('create', {path: req.path});
});

router.get('/my-contracts', restrict, function (req, res, next) {
  res.render('my-contracts', {path: req.path});
});

router.get('/transactions', restrict, function (req, res, next) {
  res.render('transactions', {path: req.path});
});

router.get('/sandbox', restrict, function (req, res, next) {
  res.render('sandbox', {path: req.path});
});

router.get('/login', function (req, res, next) {
  res.render('login', {
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

module.exports = router;
