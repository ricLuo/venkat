angular.module('UploadCtrl',[])


    .controller('UploadController',
            ['$scope','$mdSidenav','$log', '$timeout','$http','$window',
                    function($scope,$mdSidenav,$log, $timeout, $http,$window){

    $scope.toggleLeft = buildToggler('left');

    $scope.isOpenLeft = function(){
      var left = $mdSidenav('left');
      return left && left.isOpen();
    };


    $scope.uploadFile = function(files){
        var fd = new FormData();
        fd.append("file",files[0]);
        //
        // $http.post('')
        $window.alert(files[0]);
        $scope.myFile = fd.get["file"];
    }

    $scope.openFile = function(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function(){
          var dataURL = reader.result;
          var output = document.getElementById('output');
          output.src = dataURL;
        };
        reader.readAsDataURL(input.files[0]);
        };


    function buildToggler(navID){
        return function(){
            $mdSidenav(navID)
                .toggle()
                .then(function(){
                    $log.debug("toggle "+navID+" is done");
                })
        };
    }


    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      }
    }
}])

.controller('LeftCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            }
        );
    };
}])

.controller('formController', ['$scope','$http', function($scope,$http){
    $scope.submitText = function (){
        console.log('submit Text');

        $http.post('/api/uploadText',$scope.text)
            .success(function(data,status){
                console.log('success');
                console.log(data);
            })
            .error(function(data,status){
                console.log('error');
            });
    };
}]);
