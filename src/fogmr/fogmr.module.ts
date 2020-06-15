import { Module } from '@nestjs/common';
import { OrchestratorService } from './orchestrator/orchestrator.service';
import { OrchestratorController } from './orchestrator/orchestrator.controller';

@Module({
  providers: [OrchestratorService],
  controllers: [OrchestratorController]
})
export class FogmrModule {}
