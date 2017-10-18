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
    $scope.projectMeta = undefined;
    $scope.renderingOrder = undefined;
    $scope.projectData = boqWidgetService.projectData;

    // Function declarations
    $scope.expandCollapse = expandCollapse;
    $scope.addProjectData = addProjectData;

    // On component load
    this.$onInit = function() {
      getProjectMeta();
    }
    
    function getProjectMeta(){
      var callbacks = {
        assignMetaData: function(metaData){
          $scope.projectMeta = metaData;
        },
        assignRenderingOrder: function(order){
          $scope.renderingOrder = order;
        }
      }
      boqWidgetService.getProjectMeta(callbacks);
    }

    function expandCollapse(project){
      boqWidgetService.expandCollapse(project, $scope.projectData);
    }

    function addProjectData(){
      boqWidgetService.addProjectData();
    }
  }

}());