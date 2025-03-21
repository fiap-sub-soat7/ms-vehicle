import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { IMessage, MessageLevelEnum } from '../helpers/messages';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  // constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(err: Error & { status: number }, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse();

    let statusCode = err.status || 400;
    let messages: IMessage[] = [];

    Logger.error(err);
    console.error(err.stack);

    if (this.isEntityError(err)) {
      Object.values(err.response.message).forEach((m) => {
        messages.push({
          detail: m,
          level: MessageLevelEnum.WARNING,
          code: 'VALIDATION_ERROR',
        });
      });

      statusCode = 422;
    }

    const pointer: string = err.constructor.name.replace('Exception', '');
    const detail: string = `${pointer} - ${err.message}`;

    if (!messages.length) {
      messages = [
        {
          detail,
          level: MessageLevelEnum.ERROR,
        },
      ];
    }

    return reply.status(statusCode).send({ data: {}, messages });
  }

  isEntityError(data: Error): data is Error & { response: { message: Array<string> } } {
    return Array.isArray(
      (data as Error & { response: { message: Array<string> } })?.response?.message,
    );
  }
}
