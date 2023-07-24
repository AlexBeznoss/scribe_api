import fp from 'fastify-plugin';
import Redis from 'ioredis';
import { Worker, Queue } from 'bullmq';
import * as handlers from '../workers';

export type QueueT = {
  [name: string]: Queue;
}

export type WorkerT = {
  [name: string]: Worker;
}

export default fp(async (fastify) => {
  const connection = new Redis(process.env.REDIS_URL as string);
  const workers: WorkerT = {};
  const queues: QueueT = {}

  for (let handler of Object.values(handlers)) {
    queues[handler.queue] = new Queue(handler.queue, { connection });
    workers[handler.queue] = new Worker(handler.queue, handler.handle, { connection })
  }

  fastify.decorate('workers', workers);
  fastify.decorate('queues', queues);
});
