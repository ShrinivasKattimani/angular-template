;
(function() {
  'use strict';
  angular.module('boqApp')
    .config(boqConfiguration);

  boqConfiguration.$inject = ['$stateProvider'];

  function boqConfiguration($stateProvider) {
    $stateProvider.state('/boq', {
      url: '/boq',
      templateUrl: './modules/BOQ/page/views/boqPage.html',
      controller: 'boqPageCtrl'
    });
  }
}());