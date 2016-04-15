angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    // home page
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainController as mc'
    })

    // nerds page that will use the NerdController
    .when('/test/:testId', {
      templateUrl: 'views/test.html',
      controller: 'TestController as tc'
    })

    //Upload page
    .when('/upload', {
      templateUrl: 'views/Upload.html',
      controller: 'UploadController'
    });

  $locationProvider.html5Mode(true);

}]);
