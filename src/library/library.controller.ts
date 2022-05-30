import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/get-user.decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserEntity } from 'src/user/user.entity'
import { DeleteResult } from 'typeorm'
import { CreateLibraryDto } from './dto/create-library.dto'
import { GetLibrariesFilterDto } from './dto/get-libraries-filter.dto'
import { UpdateLibraryDto } from './dto/update-library.dto'
import { LibraryEntity } from './library.entity'
import { LibraryService } from './library.service'

@Controller('library')
@UseGuards(JwtAuthGuard)
export class LibraryController {
  constructor(private libraryService: LibraryService) {}
  private logger = new Logger(LibraryController.name, true)

  @Get()
  async getLibraries(
    @Query()
    filterDto: GetLibrariesFilterDto,
    @GetUser()
    user: UserEntity,
  ) {
    //
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    )
    const { libraries, count } = await this.libraryService.getLibraries(
      filterDto,
      user,
    )
    return {
      data: libraries,
      count,
    }
  }

  @Get('/:id')
  getLibraryById(
    @Param('id') id: number,
    @GetUser() user: UserEntity,
  ): Promise<LibraryEntity> {
    return this.libraryService.getLibraryById(id, user)
  }

  @Post()
  createTask(
    @Body() createLibraryDto: CreateLibraryDto,
    @GetUser() user: UserEntity,
  ): Promise<LibraryEntity> {
    this.logger.verbose(
      `User "${user.username}" creating a new library. Data: ${JSON.stringify(
        createLibraryDto,
      )}`,
    )
    return this.libraryService.createLibrary(createLibraryDto, user)
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') id: number,
    @GetUser() user: UserEntity,
  ): Promise<DeleteResult> {
    return this.libraryService.deleteLibrary(id, user)
  }

  @Put('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateLibraryDto: UpdateLibraryDto,
    @GetUser() user: UserEntity,
  ): Promise<LibraryEntity> {
    return this.libraryService.updateLibrary(updateLibraryDto, user)
  }
}
