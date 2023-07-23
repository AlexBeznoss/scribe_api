import type { FastifyInstance, FastifyReply } from 'fastify';
import type { ResultSet } from '@libsql/client';
import { Caption, CaptionStatus, CreateRequest, ShowRequest } from '../schema/caption';

export const createCaption = function (fst: FastifyInstance) {
  return async function(req: CreateRequest, reply: FastifyReply) {
    const data: ResultSet = await fst.db.execute({
      sql: "insert into captions (url, status) values (:url, :status)",
      args: { url: req.body.url, status: CaptionStatus.Draft }
    })

    reply.status(200).send({id: Number(data.lastInsertRowid)});
  }
}

export const showCaption = function(fst: FastifyInstance) {
  return async function(req: ShowRequest, reply: FastifyReply) {
    const res: ResultSet = await fst.db.execute({
      sql: "select id, url, data, status from captions where id = :id limit 1",
      args: {id: req.params.id},
    });
    const caption = res.rows[0] as unknown as Caption;

    reply.status(200).send(caption);
  }
}
