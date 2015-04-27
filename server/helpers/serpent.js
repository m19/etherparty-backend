var exec = require('child_process').exec;

var serpent = {
  compile: function (code, callback) {
    exec('serpent compile "' + code + '"', callback);
  }
};

module.exports = serpent;