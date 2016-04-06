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
    });

  $locationProvider.html5Mode(true);

}]);
