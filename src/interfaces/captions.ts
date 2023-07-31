import type { FastifyRequest } from 'fastify';
import { CaptionsShowParamsSchema as ShowParamsInterface } from '../@types/captions/show.params';
import { CaptionsCreateBodySchema as CreateBodyInterface } from '../@types/captions/create.body';

export interface CreateRequest extends FastifyRequest {
  body: CreateBodyInterface;
}

export interface ShowRequest extends FastifyRequest {
  params: ShowParamsInterface
}

export enum CaptionStatus {
  Draft = 'draft',
  Processing = 'processing',
  Ready = 'ready'
}

export type CaptionStatusType = keyof typeof CaptionStatus;

export type Caption = {
  id: number;
  url: string;
  title: string | null;
  data: string | null;
  status: CaptionStatusType;
}
