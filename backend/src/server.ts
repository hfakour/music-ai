import Fastify from 'fastify';
import cors from '@fastify/cors';

const server = Fastify();

(async () => {
  // فعال‌سازی CORS
  await server.register(cors, {
    origin: true, 
  });

  server.get('/', async () => {
    return { message: 'سلام از بک‌اند!' };
  });

  server.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
    if (err) throw err;
    console.log(`Server is running at ${address}`);
  });
})();
