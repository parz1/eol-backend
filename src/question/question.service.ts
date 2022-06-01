import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import { CreateQuestionDto } from './dto/create-question.dto'
import { GetQuestionsFilterDto } from './dto/get-questions-filter.dto'
import { QuestionEntity } from './question.entity'
import { QuestionRepository } from './question.repository'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private questionRepository: QuestionRepository,
  ) {}

  getQuestions(
    filterDto: GetQuestionsFilterDto,
    user: UserEntity,
  ): Promise<{
    questions: QuestionEntity[]
    count: number
  }> {
    // judge user auth access
    return this.questionRepository.getQuestions(filterDto)
  }

  async createQuestion(createQuestionDto: CreateQuestionDto, user: UserEntity) {
    return this.questionRepository.createQuestion(createQuestionDto, user)
  }
}
