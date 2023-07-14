import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './lib/filters/exception.filter';
import { ValidationException } from './lib/exceptions/validation.exception';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new ValidationException(errors);
      },
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');

  await app.listen(port);
}
bootstrap();
