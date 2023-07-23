import fp from 'fastify-plugin';
import { createClient  } from "@libsql/client";
import type { Client } from '@libsql/client';

export default fp(async (fastify) => {
  const client: Client = createClient({
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_TOKEN
  })
  fastify.decorate('db', client);
})
