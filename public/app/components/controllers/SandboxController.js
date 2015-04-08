'use strict';

angular.module('etherparty')
  .controller('SandboxController', function ($scope) {
    $scope.diyList = [
      'If',
      'Except if',
      'Do',
      'While'
    ];

    $scope.sandboxList = [];
  });