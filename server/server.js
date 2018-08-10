var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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

app.listen(3000, () => {
  console.log('Started on port 3000');
});
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
