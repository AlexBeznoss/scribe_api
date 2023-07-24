import fp from 'fastify-plugin';
import { dbConnection } from '../utils';

export default fp(async (fastify) => {
  fastify.decorate('db', dbConnection());
})
