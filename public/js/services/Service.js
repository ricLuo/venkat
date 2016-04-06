angular.module('Service', []).factory('Service', ['$http', function($http) {

  return {
    // call to get all tests
    getAllTests: function(cb) {
      $http.get('/api/getAllTests').then(function(res) {
        cb(res.data);
      }, function(res) {

      });
    },

    // call to get a test by test id
    getTest: function(testId, cb) {
      $http.get('/api/getTest/' + testId).then(function(res) {
        cb(res.data);
      }, function(res) {

      });
    },

    // call to create a new test
    createTest: function(testData) {
      $http.post('/api/createTest', testData);
    },

    // call to delete a test
    deleteTest: function(testId) {
      $http.delete('/api/deleteTest/' + testId);
    },

    // call to delete all tests
    deleteAllTests: function() {
      $http.delete('/api/deleteAllTests/');
    },

    // user login
    getUser: function(username, success, error) {
      $http.get('/api/getUser/' + username).then(function(res) {
        success(res.data[0]);
      }, function(res) {
        error(res);
      });
    },

    // get all users
    getAllUsers: function(success, error) {
      $http.get('/api/getAllUsers').then(function(res) {
        success(res.data);
      }, function(res) {
        error(res);
      });
    },

    // user signup
    createUser: function(username, password, success, error) {
      $http.post('/api/createUser/' + username + '/' + password).then(function(res) {
        success(res.data);
      }, function(res) {
        error(res);
      });
    },
  };

}])
