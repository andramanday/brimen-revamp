import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigEnvironment } from '@app/common/environment.config';

@Module({
  imports: [ConfigEnvironment],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
