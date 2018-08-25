const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// email, password, tokens{access, token}

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true, // trims off front and rear whitespace chars
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']); // only send these back in postman response
}

UserSchema.methods.generateAuthToken = function () {
  var user = this; // user is the document, regular function used here to access the this keyword
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'secretvalue123').toString();

  //user.tokens.push({access, token}); // ger problem i vissa datorer använd istället:
  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => { // returnerar så att man kan använda .then på den här biten i server.js
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  //console.log('token is: ', token);

  try {
    decoded = jwt.verify(token, 'secretvalue123');
  } catch (e) {
    return Promise.reject('misc crypto error');
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) { // detects when the user has entered a password
    var password = user.password;

    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        console.log('hash: ', hash);
        user.password = hash;
        next();
      });
    });
  } else { // avoid hashing a hashed password
    next();
  }

});

// lecture 90 allt i User flyttas in i UserSchema ovan, nedan görs en hänv till UserSchema
var User = mongoose.model('User', UserSchema);

module.exports = {User};
