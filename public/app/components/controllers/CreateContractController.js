'use strict';

angular.module('etherparty')
  .controller('CreateContractController', function ($scope, $filter, $http) {
    $scope.contract = {
      name: '',
      shortname: '',
      gasPrice: 0,
      gasAmount: 0,
      price: 0,
      toCompile: 'Paste contract here',
      compiledCode: '...result...'
    };

    $scope.calculateContractPrice = function () {
      var price = $scope.contract.gasPrice * $scope.contract.gasAmount;
      price = $filter('number')(price);
      $scope.contract.price = price;
    };

    $scope.compileCode = function () {
      console.log('test');
      $http({
        method: 'GET',
        url: '/compile/serpent',
        params: {
          code: $scope.contract.toCompile
        }
      }).success(function (result) {
        if (result && result.status === 'success') {
          $scope.contract.compiledCode = result.data;
        } else if (result && result.status === 'error') {
          $scope.contract.compiledCode = result.message;
        }
      });
    }
  });