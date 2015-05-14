'use strict';

angular.module('etherparty')
  .controller('MainController', function ($scope, $modal) {
    $scope.account = '';

    $scope.click = function () {
      var modal = $modal.open({
        templateUrl: 'app/components/templates/modals/createAccount.html',
        controller: 'CreateAccountController'
      });
    };
  });
