'use strict';

angular.module('etherparty', [
  'ui.router',
  'ui.bootstrap'
])
  .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'app/components/templates/dashboard.html'
      })
      .state('createContract', {
        url: '/create',
        templateUrl: 'app/components/templates/createContract.html'
      })
      .state('myContracts', {
        url: '/my-contracts',
        templateUrl: 'app/components/templates/myContracts.html'
      })
      .state('pricing', {
        url: '/pricing',
        templateUrl: 'app/components/templates/pricing.html'
      })
      .state('transactions', {
        url: '/transactions',
        templateUrl: 'app/components/templates/transactions.html'
      })
      .state('sandbox', {
        url: '/sandbox',
        templateUrl: 'app/components/templates/sandbox.html'
      })
      .state('profile', {
        templateUrl: 'app/components/templates/profile.html'
      })
      .state('profile.main', {
        url: '/profile',
        templateUrl: 'app/components/templates/profile.main.html'
      })
      .state('profile.settings', {
        url: '/profile/settings',
        templateUrl: 'app/components/templates/profile.settings.html'
      })
      .state('profile.data', {
        url: '/profile/data',
        templateUrl: 'app/components/templates/profile.data.html'
      })
      .state('profile.currency', {
        url: '/profile/currency',
        templateUrl: 'app/components/templates/profile.currency.html'
      })
      .state('profile.interface', {
        url: '/profile/interface',
        templateUrl: 'app/components/templates/profile.interface.html'
      });
  });
