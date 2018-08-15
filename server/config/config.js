var env = process.env.NODE_ENV || 'development'; // if no NODE_ENV then use 'development', (best practice to set to 'production' when deploying)
console.log('env ****** ->', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
