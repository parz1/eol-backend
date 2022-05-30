import { Module } from '@nestjs/common';
import { OptionService } from './option.service';

@Module({
  providers: [OptionService]
})
export class OptionModule {}
