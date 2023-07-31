import { FastifyPluginAsync } from "fastify"
import { createCaption, showCaption, indexCaption } from '../../controllers';
import IndexQuerySchema from '../../schemas/captions/index.querystring.json';
import CreateBodySchema from '../../schemas/captions/create.body.json';

import { CaptionsIndexQuerystringSchema as IndexQueryInterface } from "../../@types/captions/index.querystring";
import { CaptionsShowParamsSchema as ShowParamsInterface } from "../../@types/captions/show.params";
import { CaptionsCreateBodySchema as CreateBodyInterface } from "../../@types/captions/create.body";


const captions: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{Body: CreateBodyInterface}>('/', {schema: {body: CreateBodySchema}}, createCaption(fastify));
  fastify.get<{Querystring: IndexQueryInterface}>('/', {schema: { querystring: IndexQuerySchema }}, indexCaption(fastify))
  fastify.get<{Params: ShowParamsInterface}>('/:id', showCaption(fastify))
};

export default captions;
