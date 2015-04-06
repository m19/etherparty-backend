var crypto = require('crypto');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'etherparty'
});
connection.connect();

var transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 25
});

function sendActivationEmail (email, token) {
  var body = 'Hi,<br><br>';
  body += 'Please click the following link to activate your account: http://178.62.167.14:3000/activate/' + token;

  transporter.sendMail({
    from: 'noreply@etherparty.io',
    to: email,
    subject: 'Activate your Etherparty account',
    html: body
  });
}

function query (query, params, callback) {
  if (typeof params == 'function') {
    callback = params;
    params = [];
  }

  connection.query(query, params, function (err, rows, fields) {
    callback(err, rows, fields);
  });
}

module.exports = {
  validateUser: function (username, password, callback) {
    query('SELECT * FROM user WHERE username=LOWER(?)', [username], function (err, user, fields) {
      if (err) return callback(err);

      if (user && user.length) {
        bcrypt.compare(password, user[0].password, function (err, result) {
          if (err) {
            return callback(err);
          }

          if (!result) {
            return callback('WRONG_PASSWORD');
          }

          if (user[0].activated === 0) {
            return callback('NOT_ACTIVATED');
          }

          delete user[0].password;

          return callback(null, user[0]);
        });
      } else {
        return callback('NO_USER');
      }
    });
  },

  createUser: function (username, email, password, callback) {
    query('SELECT * FROM user WHERE username=LOWER(?) OR email=LOWER(?)',
      [username, email], function (err, user, fields) {
        if (err) return callback(err);

        if (user && user.length) {
          if (user[0].email == email) {
            return callback('EMAIL_TAKEN');
          }
          if (user[0].username == username) {
            return callback('USERNAME_TAKEN');
          }
        } else {
          bcrypt.hash(password, 10, function (err, hash) {
            var token = crypto.randomBytes(16).toString('hex');

            query('INSERT INTO user (username, email, password, activation_token, created_at) VALUES(?, LOWER(?), ?, ?, NOW())',
              [username, email, hash, token], function (err) {
                sendActivationEmail(email, token);
                callback(err);
              });
          });
        }
      });
  },

  activateUser: function (token, callback) {
    query('SELECT * FROM user WHERE activation_token=?', [token], function (err, user, fields) {
      if (err) return callback(err);

      if (user && user.length) {

        if (user[0].activated === 1) {
          return callback('ALREADY_ACTIVATED');
        }

        query('UPDATE user SET activated=1 WHERE activation_token=?', [token], callback);
      } else {
        return callback('NO_USER');
      }
    });
  }
};