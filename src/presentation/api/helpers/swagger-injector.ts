/* eslint-disable no-param-reassign */
import { OpenAPIObject, SwaggerCustomOptions } from '@nestjs/swagger';
import {
  PathItemObject,
  ReferenceObject,
  ResponseObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ResponseSchema } from './response-schema';

export async function SwaggerInject(): Promise<void> {
  const sw = await import('@nestjs/swagger/dist/swagger-ui/swagger-ui');

  const buildSwaggerInitJSReal = sw.buildSwaggerInitJS;
  sw.buildSwaggerInitJS = (
    swaggerDoc: OpenAPIObject,
    customOptions?: SwaggerCustomOptions,
  ): string => {
    const methods: string[] = ['get', 'post', 'put', 'delete', 'options', 'head', 'patch', 'trace'];

    Object.values(swaggerDoc.paths).forEach((doc: PathItemObject) => {
      methods.forEach((m: string) => {
        if (!doc[m]) {
          return;
        }
        try {
          if (doc[m].responses) {
            Object.values(doc[m].responses).forEach((respObj: ResponseObject) => {
              if (!respObj.content || !respObj.content['application/json']) {
                return;
              }

              const name = (
                (respObj.content['application/json']?.schema as ReferenceObject)?.$ref ||
                (
                  (respObj.content['application/json']?.schema as SchemaObject)
                    ?.items as ReferenceObject
                )?.$ref ||
                ''
              ).replace(/.*\//, '');
              if (name) {
                const schema = ResponseSchema(name);
                respObj.description = `Response<strong>&lt;${name}&gt;</strong>`;

                if (name === 'SelectableOptionDTO') {
                  // TODO aux function knowed types
                  schema.properties.data = {
                    type: 'array',
                    items: {
                      $ref: (schema.properties.data as { $ref: string }).$ref,
                    },
                  };
                } else if ((respObj.content['application/json'].schema as SchemaObject)?.items) {
                  schema.properties.data = respObj.content['application/json'].schema;
                }
                respObj.content['application/json'].schema = schema as ResponseObject;
              } else {
                respObj.description =
                  respObj.description ||
                  (respObj.content['application/json']?.schema as SchemaObject)?.description ||
                  (typeof respObj.content === 'object' &&
                    Object.keys(respObj.content).join(', ')) ||
                  'WrapperDTO&lt;unknown&gt;';
              }
            });
          }

          if (doc[m].requestBody) {
            doc[m].requestBody.content['application/json'].schema = {
              type: 'object',
              properties: {
                data: doc[m].requestBody.content['application/json'].schema,
              },
            };
          }

          if (!doc[m].security) {
            doc[m].security = [
              {
                bearer: [],
              },
            ];
          }
        } catch (e: unknown) {
          // eslint-disable-next-line no-console
          console.log('Error on wrapping swagger response:', e);
        }
      });
    });

    return buildSwaggerInitJSReal(swaggerDoc, customOptions);
  };
}
