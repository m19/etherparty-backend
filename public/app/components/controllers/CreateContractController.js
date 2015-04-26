'use strict';

angular.module('etherparty')
  .controller('CreateContractController', function ($scope, $filter) {
    $scope.contract = {
      name: '',
      shortname: '',
      gasPrice: 0,
      gasAmount: 0,
      price: 0
    };

    $scope.calculateContractPrice = function () {
      var price = $scope.contract.gasPrice * $scope.contract.gasAmount;
      price = $filter('number')(price);
      $scope.contract.price = price;
    }
  });