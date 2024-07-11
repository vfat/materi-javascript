import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private client: ClientProxy;

  constructor(private readonly appService: AppService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });
  }

  @Post('create')
  async create(@Body() user) {
    return this.client.send({ cmd: 'create_user' }, user).toPromise();
  }

  @Get('users')
  async getUsers() {
    return this.client.send({ cmd: 'get_users' }, {}).toPromise();
  }
}