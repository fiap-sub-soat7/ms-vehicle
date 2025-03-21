import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Observable, tap } from 'rxjs';
import { IResponseData } from '../types/response.interface';

const logger = new Logger('REQUEST_LOGGER');

@Injectable()
export class LoggerInterceptor<T> implements NestInterceptor<T, IResponseData<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponseData<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse<FastifyReply>();

    return next.handle().pipe(
      tap((data) => {
        logger.log({
          request: request.id,
          length: response.serialize,
          type: typeof data,
        });
      }),
    );
  }
}
