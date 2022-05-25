import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { UserController } from './user.controller'
import { UserProcessor } from './user.processor'
import { UsersRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
  imports: [
    AuthModule,
    BullModule.registerQueue({
      name: 'user',
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [UserController],
  providers: [UserService, UserProcessor],
  exports: [UserService],
})
export class UserModule {}
