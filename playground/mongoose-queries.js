const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*
var id = '5b6ea0e5889c753f4234dcfd11';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

/*
Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by id', todo);
}).catch((e) => console.log(e));;
*/

var userID = '5b6d64604315cf8f3bb95a9f';

User.findById(userID).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User found: ', JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
