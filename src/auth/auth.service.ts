import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
// import { UserLoginDto } from './dto/user-login.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pwd: string): Promise<any> {
    // const user = await this.userService.findOneByUsername(username)
    // console.log(user)
    // if (user.pwd === pwd) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   return user
    // } else {
    //   throw new UnauthorizedException('auth fail')
    // }
    return null
  }

  async login(user: any) {
    // const result: any = await this.validateUser(user.username, user.pwd)
    console.log(user.username, user.id)
    const payload = { username: user.username, userId: user.id }
    const token = this.jwtService.sign(payload)
    return {
      token,
    }
  }
}
