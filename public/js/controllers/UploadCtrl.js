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
}])

// .controller('ng-file-upload-controller', ['$scope', 'Upload', function ($scope, Upload) {
//     // upload later on form submit or something similar
//     $scope.submit = function() {
//       if ($scope.form.file.$valid && $scope.file) {
//         $scope.upload($scope.file);
//       }
//     };
//
//     // upload on file select or drop
//     $scope.upload = function (file) {
//         Upload.upload({
//             url: 'upload/url',
//             data: {file: file, 'username': $scope.username}
//         }).then(function (resp) {
//             console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
//         }, function (resp) {
//             console.log('Error status: ' + resp.status);
//         }, function (evt) {
//             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//             console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
//         });
//     };
//     // for multiple files:
//     $scope.uploadFiles = function (files) {
//       if (files && files.length) {
//         for (var i = 0; i < files.length; i++) {
//           Upload.upload({..., data: {file: files[i]}, ...})...;
//         }
//         // or send them all together for HTML5 browsers:
//         Upload.upload({..., data: {file: files}, ...})...;
//       }
//     }
// }])
;
