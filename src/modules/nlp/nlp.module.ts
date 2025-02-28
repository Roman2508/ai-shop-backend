import { Module } from '@nestjs/common';
import { NlpService } from './nlp.service';
import { NlpController } from './nlp.controller';
import { NlpProcessor } from './nlp.processor';

@Module({
  controllers: [NlpController],
  providers: [NlpService, NlpProcessor],
  exports: [NlpService],
})
export class NlpModule {}
