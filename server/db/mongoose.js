var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // sets up mongoose to use promises and not only callbacks
mongoose.connect(process.env.MONGODB_URI);
                // connects to mLab MongoDB app through heroku

module.exports = {
  mongoose: mongoose
};
