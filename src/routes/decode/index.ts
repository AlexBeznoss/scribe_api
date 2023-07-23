import { FastifyPluginAsync } from "fastify"
import { Static, Type  } from '@sinclair/typebox';
// import ytdl from "ytdl-core";
// import ffmpeg from "../../utils/ffmpeg";
// import { Readable } from "stream";
import { RevAiApiClient  } from 'revai-node-sdk';
import { Readable } from "stream";

// const loadVideo = function(url: string) : Promise<void> {
  // return new Promise(function (resolve, reject) {
    // const stream = ytdl(url, { quality: 'highestaudio' });

    // ffmpeg(stream)
      // .audioBitrate(128)
      // .save('audio.mp3')
      // .on('end', resolve)
      // .on('error', reject);
  // })
// }

const Body = Type.Object({
  url: Type.String(),
});
type BodyType = Static<typeof Body>;
const accessToken = '';

const decode: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{Body: BodyType}>('/', {schema: { body: Body }}, async function (request, reply) : Promise<void> {
    // await loadVideo(request.body.url);
    const revClient = new RevAiApiClient(accessToken);
    const stream = await revClient.getTranscriptTextStream("ked9X5bAwMsCH7c3");
    const readableStream = new Readable();
    readableStream._read = () => {};

    reply.header("Content-Type", "text/plain; charset=utf-8");
    reply.send(readableStream);

    for await (const chunk of stream) {
      readableStream.push(chunk.toString());
    }

    readableStream.push(null);

    return reply;

  })
}

export default decode;
