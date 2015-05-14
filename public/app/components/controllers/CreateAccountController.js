'use strict';

angular.module('etherparty')
  .controller('CreateAccountController', function ($scope, $modalInstance) {
    $scope.createAccount = function () {

    };
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
