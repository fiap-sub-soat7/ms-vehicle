import { PipeTransform } from '@nestjs/common';

export class RequestDataPipe implements PipeTransform {
  transform(body: Record<string, unknown>): unknown {
    return (typeof body === 'object' && body.data) || body;
  }
}
