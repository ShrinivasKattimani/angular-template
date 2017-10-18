;
(function() {
  'use strict';
  angular.module('boqApp')
    .config(appConfiguration);

  appConfiguration.$inject = ['$urlRouterProvider'];

  function appConfiguration($urlRouterProvider) {
    $urlRouterProvider.otherwise('/boq');
  }
}());