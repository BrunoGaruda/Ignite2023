import fastify from "fastify";

const app = fastify();

// GET, POST, PUT, PATCH, DELETE

// https://localhost:3333/hello

app.get('/hello', () => {
  return 'Hello World';
})

app.listen({
  port: 3333,
}).then(() => { // retorna uma promise
  console.log('HTTP Server Running!');
  })