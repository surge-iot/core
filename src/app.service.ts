import { Injectable } from '@nestjs/common';
import { AutoAggregationService } from './analytics/auto-aggregation/auto-aggregation.service';

@Injectable()
export class AppService {
  constructor(private autoAggregationService: AutoAggregationService){}
  getHello(): string {
    return 'Hello World!';
  }

  async runAnalytics(): Promise<string> {
    await this.autoAggregationService.init();
    return 'Done';
  }
  async testAnalytics(): Promise<string> {
    await this.autoAggregationService.test();
    return 'Done';
  }
}
