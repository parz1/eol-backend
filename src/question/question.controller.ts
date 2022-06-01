import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { GetUser } from 'src/auth/get-user.decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserEntity } from 'src/user/user.entity'
import { CreateQuestionDto } from './dto/create-question.dto'
import { GetQuestionsFilterDto } from './dto/get-questions-filter.dto'
import { QuestionEntity } from './question.entity'
import { QuestionService } from './question.service'

@Controller('question')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  private logger = new Logger(QuestionController.name, true)

  @Get()
  async getQuestions(
    @Query()
    filterDto: GetQuestionsFilterDto,
    @GetUser()
    user: UserEntity,
  ) {
    //
    this.logger.verbose(
      `User "${
        user.username
      }" retrieving all questions. Filters: ${JSON.stringify(filterDto)}`,
    )
    const { questions, count } = await this.questionService.getQuestions(
      filterDto,
      user,
    )
    return {
      data: questions,
      count,
    }
  }

  @Post()
  createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @GetUser() user: UserEntity,
  ): Promise<QuestionEntity> {
    console.log(createQuestionDto)
    this.logger.verbose(
      `User "${user.username}" creating a new library. Data: ${JSON.stringify(
        createQuestionDto,
      )}`,
    )
    return this.questionService.createQuestion(createQuestionDto, user)
  }
}
