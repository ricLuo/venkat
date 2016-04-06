// grab the mongoose module
var mongoose = require('mongoose');

// define User model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
  username: String,
  password: String,
  type: String,
  tests: [{
    title: String,
    questions : [{
      question : String,
      options: [{
        statement: String,
        correct: Boolean,
        selected: Boolean
      }]
    }]
  }]
});
