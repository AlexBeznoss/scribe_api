import fs from 'fs';
import os from 'os';
import crypto from 'crypto';
import ytdl from "ytdl-core";
import FormData from 'form-data';
import { Repo, ffmpeg } from '../utils'
import { CaptionStatus, Caption } from '../schema/caption';
import { Job } from 'bullmq';
import axios from 'axios';
import type { videoInfo  } from 'ytdl-core';
import type { ResultSet } from '@libsql/client'

function loadAudio(tmpPath: string, opts: videoInfo): Promise<void> {
  return new Promise(function(resolve, reject) {
    const stream = ytdl.downloadFromInfo(opts, { quality: 'highestaudio' });

    ffmpeg(stream)
      .audioBitrate(128)
      .save(tmpPath)
      .on('end', resolve)
      .on('error', reject);
  });
};

async function transcribe(tmpPath: string): Promise<string> {
  const body = new FormData();
  body.append('model', 'whisper-1');
  body.append('file', fs.createReadStream(tmpPath));
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${process.env.OPENAI_TOKEN}`
  }

  const resp = await axios.post('https://api.openai.com/v1/audio/transcriptions', body, { headers, responseType: 'json' });

  return resp.data.text;
}

export const queue = 'captions';
export async function handle(job: Job): Promise<void> {
  const captionId = job.data;

  try {
    const updateRes: ResultSet = await Repo.update('captions', captionId, { status: CaptionStatus.Processing });
    const caption = updateRes.rows[0] as unknown as Caption;
    const info: videoInfo = await ytdl.getInfo(caption.url);
    const audioFilePath = `${os.tmpdir()}/${crypto.randomBytes(4).readUInt32LE(0)}.mp3`;

    await loadAudio(audioFilePath, info);
    const data = await transcribe(audioFilePath);

    await Repo.update('captions', captionId, {
      data, 
      title: info.videoDetails.title,
      status: CaptionStatus.Ready,
    });

    fs.unlinkSync(audioFilePath);
  } catch(e) {
    await Repo.update('captions', captionId, { status: CaptionStatus.Draft });
    throw e;
  }
}
