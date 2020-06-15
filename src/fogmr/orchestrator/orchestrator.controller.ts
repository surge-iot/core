import { Controller, Get } from '@nestjs/common';
import { OrchestratorService } from './orchestrator.service';

@Controller('orchestrator')
export class OrchestratorController {
  constructor(private orchestratorService: OrchestratorService) { }

  @Get()
  async create() {
    return this.orchestratorService.createTask(['power_k_seil_l', 'power_k_seil_p'], 'power_k_seil','aggregate-add');
  }
}
