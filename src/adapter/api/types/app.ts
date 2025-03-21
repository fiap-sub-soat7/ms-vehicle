import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { MessageList } from '../helpers/messages';

/**
 * `@App()` param decorator (injector)
 * @returns AppContext
 */
export const App = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AppContext => ctx.switchToHttp().getRequest().app,
);

export interface AppContext {
  readonly user: unknown; // will be developed in future
  readonly request: FastifyRequest;
  readonly messages: MessageList;
}
