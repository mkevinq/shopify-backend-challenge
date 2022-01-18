import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  /**
   * @param {AppService} appService - Service that provides an interface for the controller to interact with the app.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Hello world route.
   *
   * @returns {string} - Hello world message.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
