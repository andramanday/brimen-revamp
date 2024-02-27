import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const MRC_RMQ_URL = configService.get<string>('MRC_RMQ_URL');
  const MRC_RMQ_QUEUE = configService.get<string>('MRC_RMQ_USERS_QUEUE');

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: MRC_RMQ_URL,
      queue: MRC_RMQ_QUEUE,
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: false,
      // Get one by one
      prefetchCount: 1,
    },
  });
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
    .addServer('/cashback-qris')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  Logger.verbose(
    `🚀 PRODUCER RABBITMQ URL ${MRC_RMQ_URL} | QUEUE: ${MRC_RMQ_QUEUE}`,
  );
  // await app.listen(3001);
}
bootstrap();
