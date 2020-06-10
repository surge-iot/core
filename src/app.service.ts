import { Injectable } from '@nestjs/common';
import { AutoAggregationService } from './analytics/auto-aggregation/auto-aggregation.service';

@Injectable()
export class AppService {
  constructor(private autoAggregationService: AutoAggregationService){}
  getHello(): string {
    return 'Hello World!';
  }

  runAnalytics(): string {
    this.autoAggregationService.init();
    return 'Done';
  }
}
