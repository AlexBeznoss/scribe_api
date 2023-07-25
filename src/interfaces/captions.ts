import type { FastifyRequest } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

export const CreateBodySchema = Type.Object({
  url: Type.String(),
});
export type CreateBodyType = Static<typeof CreateBodySchema>;

export interface CreateRequest extends FastifyRequest {
  body: CreateBodyType;
}

export type ShowParamsSchema = {
  id: string
}
export interface ShowRequest extends FastifyRequest {
  params: ShowParamsSchema
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
