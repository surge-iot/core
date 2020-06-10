import { Test, TestingModule } from '@nestjs/testing';
import { AutoAggregationService } from './auto-aggregation.service';

describe('AutoAggregationService', () => {
  let service: AutoAggregationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoAggregationService],
    }).compile();

    service = module.get<AutoAggregationService>(AutoAggregationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
