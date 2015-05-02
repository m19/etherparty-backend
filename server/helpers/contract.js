var axios = require('axios');

var contract = {
  getCoinbase: function (callback) {
    axios.post('http://localhost:8545', {
      method: 'eth_coinbase'
    }).then(function (result) {
      if (result && result.data) {
        return callback(null, result.data);
      } else {
        return callback('NO_RESULT');
      }
    }).catch(callback);
  },
  sendTransaction: function (data, callback) {
    var params = [{
      from: data.from,
      gas: '0x' + data.gas.toString(16),
      data: '0x' + data.data
    }];

    console.log(params);

    axios.post('http://localhost:8545', {
      method: 'eth_sendTransaction',
      params: params
    }).then(function (result) {
      console.log(result);
      if (result && result.data) {
        return callback(null, result.data);
      } else {
        return callback('NO_RESULT');
      }
    }).catch(callback);
  }
};

module.exports = contract;