import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/user/user.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailService } from 'src/utils/services/mail/mail.service'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { ConfigModule, ConfigService } from '@nestjs/config'
@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('app.JWTCONSTANT'),
        signOptions: { expiresIn: configService.get('app.JWTEXPIREDTIME') },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      // transport: 'smtps://friendplus@goder.club@smtpdm.aliyun.com',
      transport: {
        host: 'smtpdm.aliyun.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'friendplus@mail.goder.club',
          pass: '3CAHrD3EYCUrq6iX',
        },
      },
      defaults: {
        from: '"Friend+" <friendplus@mail.goder.club>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, MailService],
  exports: [AuthService, MailService],
})
export class AuthModule {}
