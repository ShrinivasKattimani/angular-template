;(function() {
    'use strict';

    angular.module('services.config', [])
      .constant('configuration', {
        applicationId: 3,
        clientId: '82274cbc-77ef-49de-8808-505d97de1af0',
        ADtenant: 'petrofaconline.onmicrosoft.com',
        ADendpoints: {"graph.microsoft.com":"graph.microsoft.com","//bluestageapi.petrofac.com/api/":"https://bluestage.petrofac.com/ess_api","https://api.powerbi.com":"https://analysis.windows.net/powerbi/api"},
        ssaEndPoint:'//app034azrare.cloudapp.net/api/SelfService/V1.0/Users/',
        ssaEndPointDbr:'//app034azrare.cloudapp.net/api/BiReports/V1.0/DBR/',
        ssaLocEndPoint:'//app034azrare.cloudapp.net/api/location',
        ssaIdentityEndPoint:'//app034azrare.cloudapp.net/api/Identity',
        ssacmsEndPoint:'//app034azrare.cloudapp.net/api/Homepage',
        ssaResumeEndPoint:'//app034azrare.cloudapp.net/api/Resume',
        BASE_URL_OneAPI:'//app034azrare.cloudapp.net/api/OneAPI', 
        BASE_URL_CMS_V2:'//app034azrare.cloudapp.net/api/CMS/v2/',
        BASE_URL_CMS_OneAPI:'//app034azrare.cloudapp.net/api/CMS/v2/OneAPI',
        GoogleAnalyticsCode:'',
        feedbackEndpoint:'//app034azrare.cloudapp.net/api/Feedback/api/Feedback',
        timesheetEndPoint:'//app034azrare.cloudapp.net/api/Timesheet',
        surveyEndPoint:'//app034azrare.cloudapp.net/api/',
        adalRedirectUrl:'http://localhost:7095/frameRedirect.html',
        portalEndPoint:'//app034azrare.cloudapp.net/api/portal-sit/'
      });

})();
