import type { FastifyInstance, FastifyReply } from 'fastify';
import type { ResultSet } from '@libsql/client';
import { CaptionStatus, CreateRequest, ShowRequest } from '../schema/caption';
import { Repo } from '../utils';

export const createCaption = function (fst: FastifyInstance) {
  return async function(req: CreateRequest, reply: FastifyReply) {
    const createArgs = { url: req.body.url, status: CaptionStatus.Draft }; 
    const data: ResultSet = await Repo.create('captions', createArgs);
    await fst.queues['captions'].add('job', Number(data.lastInsertRowid));

    reply.status(200).send({id: Number(data.lastInsertRowid)});
  }
}

export const showCaption = function(fst: FastifyInstance) {
  return async function(req: ShowRequest, reply: FastifyReply) {
    const caption = await Repo.find('captions', req.params.id, ['id', 'url', 'status', 'data']);

    reply.status(200).send(caption);
  }
}
