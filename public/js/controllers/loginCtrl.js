.controller('appController',function($scope,$mdDialog){
    $scope.showLogin = function() {
        $mdDialog.show({
        controller: 'LoginController',
        templateUrl: 'login.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true
      });
    }
  })
