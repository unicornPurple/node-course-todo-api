const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done()); // clears entire todo db before each test is run
});

describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        //console.log(`response.body2: ${JSON.stringify(res.body, undefined, 2)}`);
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1); // att en ny post finns i db
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e)); // catches err that occurs when fetching from db
      });
  });

  it('Should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        
        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });

});
