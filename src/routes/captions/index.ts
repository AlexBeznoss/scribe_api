import { FastifyPluginAsync } from "fastify"
import { createCaption, showCaption } from '../../controllers';
import { CreateBodySchema, CreateBodyType, ShowParamsSchema } from '../../interfaces/captions';

const captions: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{Body: CreateBodyType}>('/', {schema: {body: CreateBodySchema}}, createCaption(fastify));
  fastify.get<{Params: ShowParamsSchema}>('/:id', showCaption(fastify))
};

export default captions;
