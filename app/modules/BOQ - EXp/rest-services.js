;
(function() {
  'use strict';
  angular
    .module('boqApp')
    .factory('restService', restServices);

  restServices.$inject = ['$http'];

  function restServices($http) {

    // Variable declarations

    
    // List of consumables
    return {
      getData: getData
    }

    /*
      Get data using GET method
      @endPoint has to be parameterised string
    */
    function getData(endPoint, successCallback, errorCallback) {
      $http
        .get(endPoint, {
          crossDomain: true,
        })
        .then(
          function(response) {
            successCallback(response.data);
          },
          function(error) {
            errorCallback(error);
          }
        );
    }

  }
}());