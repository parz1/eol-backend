import { InternalServerErrorException, Logger } from '@nestjs/common'
import { UserEntity } from 'src/user/user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateLibraryDto } from './dto/create-library.dto'
import { GetLibrariesFilterDto } from './dto/get-libraries-filter.dto'
import { LibraryEntity } from './library.entity'

@EntityRepository(LibraryEntity)
export class LibraryRepository extends Repository<LibraryEntity> {
  private logger = new Logger(LibraryRepository.name, true)

  async getLibraries(filterDto: GetLibrariesFilterDto, user?: UserEntity) {
    const { pageC, pageIdx, search } = filterDto
    const skippedItems = (pageIdx - 1) * pageC
    const query = this.createQueryBuilder('library')

    if (filterDto.userId || user) {
      query.where({ user: filterDto.userId || user.id })
    }

    if (search) {
      query.andWhere(
        '(LOWER(library.name) LIKE LOWER(:search) OR LOWER(library.note) LIKE LOWER(:search))',
        { search: `%${search}%` },
      )
    }

    try {
      const [libraries, count] = await query
        .leftJoinAndSelect('library.user', 'user')
        .orderBy('library.created_at', 'DESC')
        .offset(skippedItems)
        .limit(pageC)
        .getManyAndCount()

      return { libraries, count }
    } catch (error) {
      this.logger.error(
        `Failed to get libraries for user "${
          user?.username || ''
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      )
      throw new InternalServerErrorException()
    }
  }

  async createLibrary(createLibraryDto: CreateLibraryDto, user: UserEntity) {
    // const { name, note, tags } = createLibraryDto

    const library = this.create({
      ...createLibraryDto,
      user,
    })

    await this.save(library)

    return library
  }
}
