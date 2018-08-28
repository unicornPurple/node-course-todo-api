const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'andrew@ex.com',
  password: 'user100',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'secretvalue123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'mead@ex.com',
  password: 'user200'
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 555
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => { // clears entire todo db before each test is run
    return Todo.insertMany(todos);
  }).then(() => done());
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};


module.exports = {todos, populateTodos, users, populateUsers};
