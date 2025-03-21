import { FastifyReply } from 'fastify';
import { IMessage } from '../helpers/messages';

export interface IResponseData<T> {
  data: T;
  messages: IMessage[];
  time: number;
  hostname?: string;
}

export type IResponse = FastifyReply;

export class EmptyDTO {}
