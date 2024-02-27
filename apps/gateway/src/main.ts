import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('GATEWAY_PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJS API Gateway')
    .setDescription(
      'Find here the list of endpoints to communicate with the microservices/APIs',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('')
    .addServer('/gateway')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('api', app, document);

  Logger.verbose(`🚀 APPLICATION RUNNING ON PORT ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
