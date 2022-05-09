import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserProcessor } from './user.processor'
import { UserService } from './user.service'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'user',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserProcessor],
  exports: [UserService],
})
export class UserModule {}
