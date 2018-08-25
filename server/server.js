require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} =  require('./../middleware/authenticate'); // happened to get slightly off position

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    //console.log('New todo saved: ', doc);
    res.send(doc);
  }, (err) => {
    //console.log('Unable to save todo: ', err);
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos,
      source: "get /todo"
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  //res.send(req.params);
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    //console.log('ID not valid');
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      //console.log('Todo not found');
      return res.status(404).send();
    }
    //console.log('Todo found: ', JSON.stringify(todo, undefined, 2));
    res.send({todo});
  }, (e) => {
    console.log(e);
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    //console.log('id not valid');
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      //console.log('null documents found');
      return res.status(404).send();
    }
    //console.log('removed todo: ', todo);
    res.status(200).send({todo});
  }).catch((err) => {
    console.log(err);
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(400).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  //User - model method
  //user - instace method
  //console.log('body:', body);
  //console.log('usr: ', user);

  user.save().then(() => {
    //res.send(user);
    return user.generateAuthToken(); // this return value (a token) will be used in next .then() (a promise chain)
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user); // using authenticate middleware to get user
});

app.listen(port, () => {
  console.log('Started on port:' + port);
});

module.exports = {app};

/*
var newTodo = new Todo({
  text: 'Edit video'
});

newTodo.save().then((doc) => {
  console.log('Saved todo: ', doc);
}, (e) => {
  console.log('Unable to save todo: ', e);
});

var user = new User({
  email: '  andrew@mead.com '
});

user.save().then((doc) => {
  console.log('User saved: ', doc);
}, (e) => {
  console.log('Unable to save user: ', e);
});

/*
var TodoChallenge = new Todo({
  text: 'Finish challenge',
  completed: true,
  completedAt: 1808082230
});

TodoChallenge.save(function(err, doc) {
  if (!err) {
    return console.log('Saved challenge todo: ', doc);
  }
  console.log('Unable to save todo: ', err);
});
*/
