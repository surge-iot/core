import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrchestratorService } from './orchestrator.service';
import { CreateTaskDto } from './orchestrator.dto';

@Controller('orchestrator')
export class OrchestratorController {
  constructor(private orchestratorService: OrchestratorService) { }

  @Post()
  async create(@Body() props: CreateTaskDto) {
    return this.orchestratorService.createTask(props);
  }
}
