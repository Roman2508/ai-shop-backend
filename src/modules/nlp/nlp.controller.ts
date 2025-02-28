import { Controller, Get, Query } from '@nestjs/common';
import { NlpService } from './nlp.service';

@Controller('nlp')
export class NlpController {
  constructor(private readonly nlpService: NlpService) {}

  @Get('analyze')
  async analyze(@Query('text') text: string) {
    return this.nlpService.analyze(text);
  }
}
