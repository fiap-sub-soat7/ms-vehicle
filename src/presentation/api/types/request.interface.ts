import { FastifyRequest } from 'fastify';
import { AppContext } from './app';
import { IMessage } from '../helpers/messages';

export interface IRequest extends FastifyRequest {
  app: AppContext;
  messages: Array<IMessage>;
}
