import type { FastifyRequest } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

export const CreateBody = Type.Object({
  url: Type.String(),
});
export type CreateBodyType = Static<typeof CreateBody>;

export interface CreateRequest extends FastifyRequest {
  body: CreateBodyType;
}

export type ShowParams = {
  id: string
}
export interface ShowRequest extends FastifyRequest {
  params: ShowParams
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
  external_job_id: string | null;
  data: string | null;
  status: CaptionStatusType;
}
