import { InjectQueue } from '@nestjs/bull'
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Queue } from 'bull'
import { AuthService } from 'src/auth/auth.service'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    @InjectQueue('user') private readonly userQueue: Queue,
    private userService: UserService,
    private authService: AuthService,
  ) {
    userQueue.on('completed', (job, result) => {
      console.log(`Job completed with result ${result}`)
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    throw new ForbiddenException('user', 'not my fault')
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.getToken(req.user)
  }

  @Post('signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.userService.signUp(authCredentialsDto)
  }

  @Post('count')
  async count() {
    const job = await this.userQueue.add('count', {
      file: 'count.mp3',
    })
    return job
  }

  @Post('transcode')
  async transcode() {
    const job = await this.userQueue.add('transcode', {
      file: 'transcode.mp3',
    })
    return job
  }

  @Post('jobState')
  async jobState() {
    return this.userQueue.pause()
  }

  @Post('resume')
  async resume() {
    return this.userQueue.resume()
  }
}
