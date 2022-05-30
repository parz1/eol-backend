import { InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import {
  EntityManager,
  EntityRepository,
  Repository,
  Transaction,
  TransactionManager,
} from 'typeorm'
import { CreateQuestionDto } from './dto/create-question.dto'
import { GetQuestionsFilterDto } from './dto/get-questions-filter.dto'
import { OptionEntity } from './option/option.entity'
import { QuestionEntity } from './question.entity'

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {
  constructor(
    @InjectRepository(OptionEntity)
    private optionRepository: Repository<OptionEntity>,
  ) {
    super()
  }
  private logger = new Logger(QuestionRepository.name, true)

  async getQuestions(filterDto: GetQuestionsFilterDto, user?: UserEntity) {
    const { pageC, pageIdx, search } = filterDto
    const skippedItems = (pageIdx - 1) * pageC
    const query = this.createQueryBuilder('question')

    if (filterDto.userId || user) {
      query.where({ user: filterDto.userId || user.id })
    }

    if (search) {
      query.andWhere(
        '(LOWER(question.name) LIKE LOWER(:search) OR LOWER(question.note) LIKE LOWER(:search))',
        { search: `%${search}%` },
      )
    }

    try {
      const [questions, count] = await query
        .leftJoinAndSelect('question.user', 'user')
        .orderBy('question.created_at', 'DESC')
        .offset(skippedItems)
        .limit(pageC)
        .getManyAndCount()

      return { questions, count }
    } catch (error) {
      this.logger.error(
        `Failed to get questions for user "${
          user?.username || ''
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      )
      throw new InternalServerErrorException()
    }
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  async createQuestion(
    @TransactionManager() manager: EntityManager,
    createQuestionDto: CreateQuestionDto,
    user: UserEntity,
  ) {
    // const { name, note, tags } = createQuestionDto
    const _options = this.optionRepository.create(createQuestionDto.options)
    const options = await this.optionRepository.save(_options)

    const { options: op, ..._createQuestionDto } = createQuestionDto
    const question = this.create({
      ..._createQuestionDto,
      user,
    })

    await this.save(question)

    return question
  }
}
