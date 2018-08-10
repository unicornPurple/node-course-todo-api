var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // sets up mongoose to use promises and not only callbacks
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose: mongoose
};
