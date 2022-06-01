import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'
import { OptionModule } from './option/option.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionRepository } from './question.repository'

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
  imports: [OptionModule, TypeOrmModule.forFeature([QuestionRepository])],
})
export class QuestionModule {}
