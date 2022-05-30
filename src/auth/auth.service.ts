import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'jsonwebtoken'
import { UserService } from 'src/user/user.service'
// import { UserLoginDto } from './dto/user-login.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name, true)

  async validateUser(username: string, password: string): Promise<any> {
    // this.logger.verbose({ username, password })
    const user = await this.userService.getPassword(username)
    console.log(user)
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      console.log(result)
      return result
    } else {
      throw new UnauthorizedException('Please check your login credentials')
    }
  }

  async getToken(user: any) {
    const payload: JwtPayload = { username: user.username, userId: user.id }
    const token: string = this.jwtService.sign(payload)
    return {
      accessToken: token,
    }
  }
}
