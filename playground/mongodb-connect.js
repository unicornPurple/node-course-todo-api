// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // eqvivalent med ovanstående + ObjectID

/* var obj = new ObjectID(); // skapar eget objektID som man kan använda hur man vill
console.log(obj); */
/* var user = {name: 'Andrew', age: 54};
var {name} = user; // splittar ut name till en egen variabel
console.log(name); */

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongoDB server: ', err);
  }
  console.log('Connected to mongoDB server');

  db.collection('Users').insertOne({
    name: 'Andrew',
    age: 43,
    location: 'Philadelphia'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user: ', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops[0]._id.getTimestamp());
  });

  /*
  db.collection('Todos').insertOne({
    text: 'fixa grejer',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo: ', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });
  */
  db.close();
});
