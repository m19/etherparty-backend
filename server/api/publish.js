var contract = require('../helpers/contract');

var publish = {
  contract: function (req, res, next) {
    var compiledContract = req.query.contract;

    contract.getCoinbase(function (err, result) {
      if (!err && result) {
        var coinbase = result.result;

        var data = {
          from: coinbase,
          gas: 3000000,
          data: compiledContract
        };

        contract.sendTransaction(data, function (result) {
          console.log(result);
          res.json(result);
        });
      }
    });

  }
};

module.exports = publish;