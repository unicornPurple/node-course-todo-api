var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true // trims off front and rear whitespace chars
  }
});

module.exports = {User};
