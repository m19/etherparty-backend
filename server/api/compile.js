var serpent = require('../helpers/serpent');

var compile = {
  serpent: function (req, res, next) {
    var code = req.query.code;

    if (!code) {
      return res.json({
        status: 'error',
        message: 'missing parameter "code"'
      });
    }

    serpent.compile(code, function (err, stdout) {
      if (!err && stdout) {
        return res.json({
          status: 'success',
          data: stdout
        });
      } else {
        return res.json({
          status: 'error',
          message: 'could not compile code'
        });
      }
    });
  }
};

module.exports = compile;