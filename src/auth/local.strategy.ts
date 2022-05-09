import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passwordField: 'pwd',
    })
  }

  async validate(username: string, pwd: string): Promise<any> {
    const user = await this.authService.validateUser(username, pwd)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
