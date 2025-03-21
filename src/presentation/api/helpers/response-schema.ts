import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { MessageLevelEnum } from './messages';

export function ResponseSchema(name: string): SchemaObject {
  return {
    type: 'object',
    description: name ? `Response/${name}` : undefined,
    properties: {
      data: {
        $ref: name ? `#/components/schemas/${name}` : undefined,
      },
      messages: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            level: {
              enum: Object.values(MessageLevelEnum),
            },
            detail: {
              type: 'string',
            },
            code: {
              type: 'string',
            },
          },
        },
      },
      time: {
        type: 'number',
      },
    },
  };
}
