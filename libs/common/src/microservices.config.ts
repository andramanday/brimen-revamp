import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const MicroServicesConfig = ClientsModule.registerAsync([
  {
    name: 'RABBIT_MQ_USERS',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      transport: Transport.RMQ,
      options: {
        urls: [configService.get<string>('MRC_RMQ_URL')],
        queue: configService.get<string>('MRC_RMQ_USERS_QUEUE'),
      },
    }),
  },
]);
