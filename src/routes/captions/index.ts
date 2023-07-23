import { FastifyPluginAsync } from "fastify"
import { createCaption, showCaption } from '../../controllers';
import { CreateBody, CreateBodyType, ShowParams } from '../../schema/caption';

const captions: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{Body: CreateBodyType}>('/', {schema: {body: CreateBody}}, createCaption(fastify));
  fastify.get<{Params: ShowParams}>('/:id', showCaption(fastify))
};

export default captions;
