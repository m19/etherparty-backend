var contract = require('../helpers/contract');

var publish = {
  contract: function (req, res, next) {
    var compiledContract = req.query.contract;

    contract.getCoinbase(function (err, result) {
      console.log(err);
      console.log(result);
      if (!err && result) {
        var coinbase = result.result;

        var data = {
          from: coinbase,
          gas: 10,
          data: compiledContract
        };

        console.log(data);

        contract.sendTransaction(data, function (err, result) {
          console.log(err);
          console.log(result);
          res.json(result);
        });
      }
    });

  }
};

module.exports = publish;