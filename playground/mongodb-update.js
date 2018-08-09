const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongoDB server: ', err);
  }
  console.log('Connected to mongoDB server');

  // findOneAndUpdate
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5b6c98606626260066523674')
  }, {
    $set: {
      completed: false
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b6b5febc772c332cacdc67c')
  }, {
    $set: {name: 'Andrew'},
    $inc: {age: 1}
  }, {
    returnOriginal: false
  }, function(err, result) {
    if (!err) {
      console.log(result);
    }
  })

  //db.close();
});
