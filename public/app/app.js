'use strict';

angular.module('etherparty', [
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('dashboard', {
        url: "/",
        templateUrl: "app/components/templates/dashboard.html"
      })
      .state('createContract', {
        url: "/create",
        templateUrl: "app/components/templates/createContract.html"
      })
      .state('myContracts', {
        url: "/my-contracts",
        templateUrl: "app/components/templates/myContracts.html"
      })
      .state('transactions', {
        url: "/transactions",
        templateUrl: "app/components/templates/transactions.html"
      })
      .state('sandbox', {
        url: "/sandbox",
        templateUrl: "app/components/templates/sandbox.html"
      })
  });