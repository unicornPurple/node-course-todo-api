const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongoDB server: ', err);
  }
  console.log('Connected to mongoDB server');

  // deleteMany, deleteOne, findOneAndDelete
  db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    console.log(result);
  })

  db.collection('Todos').deleteOne({completed: true}).then((result) => {
    console.log(result);
  });

  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });

  db.collection('Users').deleteMany({name: 'Andrew'}).then((result) => {
    console.log('challenge many: ', result.result);
  });

  db.collection('Users').deleteOne({
    _id: new ObjectID('5b6bdffc3ba41f33fb47e7ee')
  }).then((result) => {
    console.log('challenge id: ', result.result);
  });

  //db.close();
});
