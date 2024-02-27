import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('RABBIT_MQ_USERS') private readonly clientRabbitMq: ClientProxy,
  ) {}

  public send(pattern: string, data: any) {
    return this.clientRabbitMq.send(pattern, data).toPromise();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
