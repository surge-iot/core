import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('analytics')
  runAnalytics(): Promise<string> {
    return this.appService.runAnalytics();
  }

  @Get('analytics/test')
  testAnalytics(): Promise<string> {
    return this.appService.testAnalytics();
  }
}
