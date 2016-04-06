angular.module('MainCtrl', []).controller('MainController', function(Service, $window, $mdToast) {
  var mc = this;

  // show toast message
  mc.showMessage = function(msg) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(msg)
        .hideDelay(3000)
    );
  };

  // reroute to test page
  mc.gotoTest = function(test) {
    $window.location.href = '/test/' + test['_id'];
  };

  // user login/signup functions
  mc.login = function() {
    if(mc.username && mc.password) {
      Service.getUser(mc.username, function(res) {
        // check entered password
        if(res && res.password == mc.password) {
          mc.user = res;
          delete mc.username;
          delete mc.password;
        } else {
          delete mc.username;
          delete mc.password;
          mc.showMessage('Invalid username or password');
        }
      }, function(res) {
        delete mc.username;
        delete mc.password;
        mc.showMessage('Error getting user data');
      });
    }
  };

  // log out current user
  mc.logout = function() {
    delete mc.user;
  };

  // create a new user
  mc.signup = function() {
    if(mc.username && mc.password) {
      Service.createUser(mc.username, mc.password, function(res) {
        mc.login();
      }, function(res) {
        mc.showMessage('Error signing up ' + mc.username);
      });
    }
  };

  // start point
  Service.getAllTests(function(data) {
    mc.allTests = data;
  });
});
