import type { FastifyRequest, FastifyInstance, FastifyReply } from 'fastify';
import type { ResultSet } from '@libsql/client';
import { CaptionStatus, CreateRequest, ShowRequest } from '../interfaces/captions';
import { CaptionsIndexQuerystringSchema as IndexQueryInterface } from '../@types/captions/index.querystring';
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
    const caption = await Repo.find('captions', req.params.id, ['id', 'url', 'status', 'title', 'data']);

    reply.status(200).send(caption);
  }
}

export const indexCaption = function(fst: FastifyInstance) {
  return async function(req: FastifyRequest, reply: FastifyReply) {
    const query = req.query as unknown as IndexQueryInterface
    const data = await Repo.paginated('captions', ['id', 'status', 'title'], query.page || 1);

    reply.status(200).send(data);
  }
}
