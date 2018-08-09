const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongoDB server: ', err);
  }
  console.log('Connected to mongoDB server');

  /* db.collection('Todos').find({
    _id: new ObjectID('5b6be4bc66262600665227a1')
  }).toArray().then((docs) => { //.find ger pointer to db, .toArr ger string, .then för det är ett promise
   console.log('Todos');
   console.log(JSON.stringify(docs, undefined, 2));
 }, (err) => {
    console.log('Unable to fetch todos: ', err);
  }); */

  /* db.collection('Todos').find().count().then((count) => {
   console.log(`Todos count: ${count}`);
 }, (err) => {
    console.log('Unable to fetch todos: ', err);
  }); */

  db.collection('Users').find({
    name: 'Andrew'
  }).toArray().then((docs) => { //.find ger pointer to db, .toArr ger string, .then för det är ett promise
   console.log('Users');
   console.log(JSON.stringify(docs, undefined, 2));
 }, (err) => {
    console.log('Unable to fetch users: ', err);
  });

  //db.close();
});
