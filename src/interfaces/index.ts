import type { FastifyRequest } from 'fastify';

type CreateCaptionBody = {
  url: string;
}

export interface CreateCaptionRequest extends FastifyRequest {
  body: CreateCaptionBody;
}

export enum CaptionStatus {
  draft,
  processing,
  ready
}

type CaptionStatusT = keyof typeof CaptionStatus;

export type Caption = {
  id: number;
  url: string;
  status: CaptionStatusT;
}
