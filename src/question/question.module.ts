import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'
import { OptionModule } from './option/option.module'

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
  imports: [OptionModule],
})
export class QuestionModule {}
