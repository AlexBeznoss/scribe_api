import fastify from 'fastify';
import type { Client } from '@libsql/client';
import type { QueueT, WorkerT } from '../plugins/bull';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse,
  > {
      db: Client;
      queues: QueueT,
      workers: WorkerT,
    }
}
