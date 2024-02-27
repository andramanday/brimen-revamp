import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateUserDto } from '@app/dto';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    // return await this.gatewayService.createUser(createUserDto);
    const testKirim = await this.gatewayService.send(
      'rabbit-mq-andra',
      createUserDto,
    );
    console.log({ response_on_producer: testKirim });

    return testKirim;
  }
}
