import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LibraryController } from './library.controller'
import { LibraryRepository } from './library.repository'
import { LibraryService } from './library.service'

@Module({
  imports: [TypeOrmModule.forFeature([LibraryRepository])],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
