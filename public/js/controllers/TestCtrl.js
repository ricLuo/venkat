angular.module('TestCtrl', []).controller('TestController', function(Service, $routeParams, $window) {

  var tc = this;

  tc.goHome = function() {
    $window.location.href = '/';
  };

  // check each question to get test score
  tc.checkTest = function() {
    tc.test.score = 0;

    angular.forEach(tc.test.questions, function(question, questionIndex) {
      if(question.score == true) {
        tc.test.score += 1;
      }
    });

  };


  // check the given question to get score for this question
  tc.checkQuestion = function(question) {
    question.score = true;
    // check selection for each option
    angular.forEach(question.options, function(option, optionIndex) {
      if(option.correct != option.selected) {
        question.score = false;
      }
    });

    tc.checkTest();
  };


  // start point
  Service.getTest($routeParams.testId, function(data) {

    tc.test = data[0];

    // fill fields with default value
    tc.test.score = 0;

    angular.forEach(tc.test.questions, function(question, questionIndex) {
      question.score = false;

      angular.forEach(question.options, function(option, optionIndex) {
        option.selected = false;
      });
    });

  });

});
