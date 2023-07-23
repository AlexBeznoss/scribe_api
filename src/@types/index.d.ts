import fastify from 'fastify';
import type { Client } from '@libsql/client';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse,
  > {
      db: Client;
    }
}
