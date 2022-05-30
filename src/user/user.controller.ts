import { InjectQueue } from '@nestjs/bull'
import {
  BadRequestException,
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
import { Transform, Type } from 'class-transformer'
import { AuthService } from 'src/auth/auth.service'
import { GetUser } from 'src/auth/get-user.decorator'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { UserEntity } from './user.entity'
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

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    if (!Number.isInteger(Number(id)))
      throw new BadRequestException('/:id not integer')
    return this.userService.findOne(Number(id))
  }

  @Get('info')
  async getUserInfo(@GetUser() _user: UserEntity) {
    return _user
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
