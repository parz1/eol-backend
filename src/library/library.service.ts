import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { instanceToPlain } from 'class-transformer'
import { UserEntity } from 'src/user/user.entity'
import { CreateLibraryDto } from './dto/create-library.dto'
import { GetLibrariesFilterDto } from './dto/get-libraries-filter.dto'
import { UpdateLibraryDto } from './dto/update-library.dto'
import { LibraryEntity } from './library.entity'
import { LibraryRepository } from './library.repository'

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(LibraryRepository)
    private libraryRepository: LibraryRepository,
  ) {}

  getLibraries(
    filterDto: GetLibrariesFilterDto,
    user: UserEntity,
  ): Promise<{
    libraries: LibraryEntity[]
    count: number
  }> {
    // judge user auth access
    return this.libraryRepository.getLibraries(filterDto)
  }

  async getLibraryById(id: number, user: UserEntity) {
    const result = this.libraryRepository.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException(
        `Library with ID "${id}" not found, searched by User "${user.username}"`,
      )
    }

    return result
  }

  getLibrariesByUser(
    filterDto: GetLibrariesFilterDto,
    user: UserEntity,
  ): Promise<{
    libraries: LibraryEntity[]
    count: number
  }> {
    return this.libraryRepository.getLibraries(filterDto, user)
  }

  createLibrary(
    createLibraryDto: CreateLibraryDto,
    user: UserEntity,
  ): Promise<LibraryEntity> {
    return this.libraryRepository.createLibrary(createLibraryDto, user)
  }

  async deleteLibrary(id: number, user: UserEntity) {
    const result = await this.libraryRepository.delete({ id, user })

    if (result.affected === 0) {
      throw new NotFoundException(`Library with ID "${id}" not found`)
    }

    return result
  }

  async updateLibrary(updateLibraryDto: UpdateLibraryDto, user: UserEntity) {
    let library = await this.getLibraryById(updateLibraryDto.id, user)
    library = {
      ...updateLibraryDto,
      ...library,
    }
    await this.libraryRepository.save(library)

    return library
  }
}
