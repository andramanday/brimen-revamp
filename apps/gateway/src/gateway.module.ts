import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigEnvironment, MicroServicesConfig } from '@app/common';

@Module({
  imports: [ConfigEnvironment, MicroServicesConfig],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
