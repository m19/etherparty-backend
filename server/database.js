var bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'etherparty'
});
connection.connect();

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
    query('SELECT * FROM user WHERE username=?', [username], function (err, user, fields) {
      if (err) return callback(err);

      if (user && user.length) {
        bcrypt.compare(password, user[0].password, function (err, result) {
          if (err) {
            return callback(err);
          }

          if (!result) {
            return callback('WRONG_PASSWORD');
          }

          delete user[0].password;

          return callback(null, user[0]);
        });
      } else {
        return callback('NO_USER');
      }
    });
  }
};