;
(function() {
  'use strict';
  angular
    .module('boqApp')
    .component('boqWidget', {
      templateUrl: './modules/BOQ/component/views/boq.html',
      controller: boqWidgetController
    });

  boqWidgetController.$inject = ['$scope',
    '$element',
    '$attrs',
    'boqWidgetService'
  ];

  function boqWidgetController($scope,
    $element,
    $attrs,
    boqWidgetService) {

    // Variable declarations
    $scope.node = undefined;
    $scope.projectMeta = undefined;
    $scope.renderingOrder = undefined;
    $scope.projectData = undefined;

    // Function declarations
    $scope.expandCollapse = expandCollapse;

    // On component load
    this.$onInit = function() {
      getProjectMeta();
    }
    
    function getProjectMeta(){
      var callbacks = {
        assignMetaData: function(metaData){
          $scope.projectMeta = metaData;
          getProjectData();
        },
        assignRenderingOrder: function(order){
          $scope.renderingOrder = order;
        }
      }
      boqWidgetService.getProjectMeta(callbacks);
    }

    function getProjectData(){
      var callbacks = {
        setProjectData: function(data){
          $scope.projectData = data;
          console.log($scope.projectData);
        }
      }
      boqWidgetService.getProjectData(callbacks);
    }

    function expandCollapse(project){
      boqWidgetService.expandCollapse(project, $scope.projectData);
    }
  }

}());