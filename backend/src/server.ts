import Fastify from 'fastify';

const server = Fastify();

server.get('/', async () => {
  return { message: 'سلام از بک‌اند!' };
});

server.listen({ port: 3001 }, (err, address) => {
  if (err) throw err;
  console.log(`Server is running at ${address}`);
});
