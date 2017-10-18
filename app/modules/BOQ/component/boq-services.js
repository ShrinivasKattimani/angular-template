;
(function() {
  'use strict';
  angular
    .module('boqApp')
    .factory('boqWidgetService', boqWidgetServices);

  boqWidgetServices.$inject = ['restService'];

  function boqWidgetServices(restService) {

    // Variable declarations

    // List of consumables
    return {
      getProjectMeta: getProjectMeta,
      getProjectData: getProjectData,
      expandCollapse: expandCollapse
    }

    function getProjectMeta(callback){
      var projectMetaUrl = "./modules/BOQ/json-data/header-details.json";
      
      function projectMetaSuccessHandler(response){
        var flattenedHeaderMeta = flattenMetaData(response.headerMeta);
        callback.assignMetaData(flattenedHeaderMeta);
        var renderingOrder = getRenderingOrder(response.headerMeta);
        callback.assignRenderingOrder(renderingOrder);
      }

      function projectMetaErrorHandler(error){
      }
      
      restService.getData(projectMetaUrl,
        projectMetaSuccessHandler,
        projectMetaErrorHandler);
    }

    /*
      Level order traversal of multiple trees.
      FIX-ME: Since levels are fixed to 2, code is not generic.
      Check if recursion can be used here to make it generic.
    */
    function flattenMetaData(nestedMeta){
      var flattenedData = [[],[]];
      // 1st level traversal
      for(var i=0; i<nestedMeta.length; i++){
          nestedMeta[i]['rowSpan'] = nestedMeta[i].children.length==0 ? 2: 1;
          nestedMeta[i]['colSpan'] = nestedMeta[i].children.length==0 ? 1: nestedMeta[i].children.length;
          flattenedData[0].push(nestedMeta[i]);
      }
      // 2nd level traversal
      for(var i=0; i<nestedMeta.length; i++){
        if(nestedMeta[i].children.length>0){
          for(var j=0; j<nestedMeta[i].children.length; j++){
            nestedMeta[i].children[j]['rowSpan'] = 1;
            nestedMeta[i].children[j]['colSpan'] = 1;
            flattenedData[1].push(nestedMeta[i].children[j]);
          }
        }
      }
      return flattenedData;
    }

    /*
      Leaf order traversal of multiple trees.
    */
    function getRenderingOrder(nestedMeta){
      var order = []; //List of keys in the order of which, grid columns will get rendered.
      
      function traverse(tree){
        if(tree.children.length==0){
          order.push(tree.key);
        }
        else{
          for(var i=0; i<tree.children.length; i++){
            traverse(tree.children[i]);
          }
        }
      }

      for(var i=0; i<nestedMeta.length; i++){
        traverse(nestedMeta[i]);
      }

      return order;
    }

    function getProjectData(callback){
      var projectDataUrl = "./modules/BOQ/json-data/nested-data.json";
      
      function projectDataSuccessHandler(response){
        callback.setProjectData(response.treeData);
      }

      function projectDataErrorHandler(error){
      }
      
      restService.getData(projectDataUrl,
        projectDataSuccessHandler,
        projectDataErrorHandler);
    }

    function expandCollapse(project, allProjects){
      if(project.children[0].open){
        collapseProject(project, allProjects);
      }
      else{
        expandProject(project, allProjects);
      }
    }

    function expandProject(project, allProjects){
      function expand(tree){
        if(tree.parentId == project.id){
          tree.open = true;
        }
        else{
          for(var i=0; i<tree.children.length; i++){
            expand(tree.children[i]);
          }          
        }
      }

      for(var i=0; i<allProjects.length; i++){
        expand(allProjects[i]);
      }
    }

    function collapseProject(project, allProjects){
      var clickedNode = getClickedNode(project, allProjects);

      function collapse(tree){
        tree.open = false;
        for(var i=0; i<tree.children.length; i++){
          collapse(tree.children[i]);
        }
      }

      for(var i=0; i<clickedNode.children.length; i++){
        collapse(clickedNode.children[i]);
      }
    }

    function getClickedNode(project, allProjects){
      var clickedNode = undefined;
      function findClickedNode(tree){
        if(tree.id == project.id){
          clickedNode = tree;
        }
        for(var i=0; i<tree.children.length; i++){
          findClickedNode(tree.children[i]);
        }
      }

      for(var i=0; i<allProjects.length; i++){
        findClickedNode(allProjects[i]);
      }

      return clickedNode;
    }
  }
}());