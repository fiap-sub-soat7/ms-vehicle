import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

import { SwaggerInject } from './helpers/swagger-injector';
import { ExceptionsFilter } from './interceptors/exceptions.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { RequestDataPipe } from './interceptors/transform.pipe';
import { AppModule } from './app.module';
import { config } from '@/environment';

export const httpApp = async (): Promise<void> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true, // false,
      maxParamLength: 1000,
    }),
    {
      logger: ['verbose'] /* !config.get('log.level'), */,
    },
  );

  app.enableCors({
    origin: [/\.blackode\.tech$/, 'http://localhost:3000'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  });

  app.useGlobalPipes(
    new RequestDataPipe(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      errorHttpStatusCode: 422,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ExceptionsFilter());
  // app.setGlobalPrefix('', { exclude: [{ path: 'health', method: RequestMethod.GET }], });

  // swagger
  await SwaggerInject();
  const swaggerDocumentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(`${config.get('application.name')} - API Docs`)
    .setDescription(process.env.HOSTNAME)
    .setVersion(config.get('application.version'))
    .addServer(`/${config.get('application.service')}`, 'Local [proxy]')
    .addServer('/', 'Local')
    .build();

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
  };
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions,
  );

  SwaggerModule.setup('/docs', app, swaggerDocument, {
    swaggerOptions: {},
  });

  const port = config.get('application.port');

  try {
    await app.listen(port, config.get('application.host'));
    Logger.log(`API Listen on ${port}`);
  } catch (error) {
    Logger.error(error);
  }
};
