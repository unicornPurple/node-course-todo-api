const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
/*
Todo.remove({}).then((result) => {
  console.log(result);
});
*/

Todo.findOneAndRemove({_id: '5b6f54d24559979849a370a0'}).then((todo) => {
  console.log('removed: ', todo);
});

Todo.findByIdAndRemove('5b6f54d24559979849a370a0').then((todo) => {
  console.log(todo);
});
