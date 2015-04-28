var validator = require('validator');
var database = require('./database');

var stripe = require("stripe")('sk_test_Ur0fkKkSqpoM4XYVBtDtSRD8');

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
  },

  payment: function (req, res, next) {
    var stripeToken = req.body.stripeToken;
    if(!stripeToken) {
      return res.status(400).json({message: 'Invalid stripe token.'});
    }

    var charge = {
      amount: 25*100,     // amount in cents
      currency: 'USD',    // presently can only be USD
      description: "Etherparty subscription"
    };

    if(req.body.type == 'bitcoin_receiver') {
      var receiver = stripe.bitcoinReceivers.create({
        amount: charge.amount,
        currency: charge.currency,
        email: req.body.email
      }, function(err, receiver) {
        charge.source = receiver.id;
        return postCharge();
      });
    } else {
      charge.card = stripeToken;
      return postCharge();
    }

    function postCharge() {
      stripe.charges.create(charge, function(err, charge) {
        if(err) {
          return res.status(500).json({message: 'Error in proccing the payment.'});
        }
        database.updatePlan(req.session.user.id, function(err) {
          if(err) {
            return res.status(500).json({message: 'Error updating the plan.'});
          }
          return res.json({message: 'Successfully updated the plan.'});
        });
      });
    }

  },

};

module.exports = user;