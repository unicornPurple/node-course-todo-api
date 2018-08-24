const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log('jwt token: ', token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded: ', decoded);

/*
var message = 'I am user number 007';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`SHA256: ${hash}`);

var data = {
  id: 4
};
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'someSecretSalt').toString()
}

var resultHash = SHA256(JSON.stringify(token.data) + 'someSecretSalti').toString()

if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust!');
}
*/
