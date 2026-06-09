import { PrismaClient } from '@prisma/client';
import { createServer } from './server';

const prisma = new PrismaClient();
const server = createServer(prisma);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

server.listen({
  host: HOST,
  port: Number(PORT),
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
