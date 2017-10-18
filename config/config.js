;(function() {
    'use strict';

    angular.module('services.config', [])
      .constant('configuration', {
        applicationId: @@applicationId,
        clientId: '@@clientId',
        ADtenant: '@@ADtenant',
        ADendpoints: @@ADendpoints,
        ssaEndPoint:'@@ssaEndPoint',
        ssaEndPointDbr:'@@ssaEndPointDbr',
        ssaLocEndPoint:'@@ssaLocEndPoint',
        ssaIdentityEndPoint:'@@ssaIdentityEndPoint',
        ssacmsEndPoint:'@@ssacmsEndPoint',
        ssaResumeEndPoint:'@@ssaResumeEndPoint',
        BASE_URL_OneAPI:'@@BASE_URL_OneAPI', 
        BASE_URL_CMS_V2:'@@BASE_URL_CMS_V2',
        BASE_URL_CMS_OneAPI:'@@BASE_URL_CMS_OneAPI',
        GoogleAnalyticsCode:'@@GoogleAnalyticsCode',
        feedbackEndpoint:'@@feedbackEndpoint',
        timesheetEndPoint:'@@timesheetEndPoint',
        surveyEndPoint:'@@surveyEndPoint',
        adalRedirectUrl:'@@adalRedirectUrl',
        portalEndPoint:'@@portalEndPoint'
      });

})();
