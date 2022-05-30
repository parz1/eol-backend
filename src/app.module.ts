import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from '../config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { LoggerMiddleware } from './utils/middleware/logger.middleware'
import { BullModule } from '@nestjs/bull'
import { AuthModule } from './auth/auth.module'
import { LibraryModule } from './library/library.module'
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.mysql.HOST'),
        port: +configService.get<number>('db.mysql.PORT'),
        username: configService.get('db.mysql.USERNAME'),
        password: configService.get('db.mysql.PASSWORD'),
        database: configService.get('db.mysql.DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('db.redis.HOST'),
          port: configService.get('db.redis.PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    LibraryModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
