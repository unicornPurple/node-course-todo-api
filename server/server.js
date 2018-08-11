var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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
    console.log('ID not valid');
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      console.log('Todo not found');
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
    console.log('id not valid');
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      console.log('null documents found');
      return res.status(404).send();
    }
    console.log('removed todo: ', todo);
    res.status(200).send(todo);
  }).catch((err) => {
    console.log(err);
    res.status(400).send();
  });
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
