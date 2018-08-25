// The important point is that user.save() returns a Promise. Here's another example:

const myFunction1 = () => {
    return new Promise((resolve, reject) => {
        console.log('funk 1 - vänta ..');
        setTimeout(() => {
        resolve('yeah dude')
        //reject('unfinished')
      }, 3000)
    })
}

const myFunction2 = () => {
    console.log('funk 2 ..');
    return myFunction1()
}

myFunction2().then((msg) => {
    console.log('finished', msg)
}, (err) => {
  console.log(err);
})

/*
Without the return statement in myFunction2, I cannot do myFunction2.then().
In my example, myFunction1 is equivalent to user.save() while myFunction2
is the generateAuthToken function.
*/

const somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Some data')
    //reject('no data')
  }, 6000);
});
somePromise.then((data) => {
  console.log(data) // Will print "Some data"
  return 'Some other data'
}).then((data) => {
  console.log(data) // Will print "Some other data"
}, (errMsg) => {
  console.log('err:', errMsg);
})

/*
In a promise chain, we could return a promise. We could also return any value,
such as the string "Some other data" in the example above. That returned value
just gets passed along to the next "success" handler.
*/


var secTimer = function(i) {
  setTimeout(() => {
    console.log(i + ' sec');
    i++;
    if (i < 8) {
      secTimer(i);
    }
  }, 996);
}

var i = 1;
secTimer(i);


var timer2 = (duration, callback) => {
  setTimeout(() => {
    callback('tick');
  }, duration);
}

timer2(1000, (time) => {
  if (time) {
    console.log(time);
  }
});
