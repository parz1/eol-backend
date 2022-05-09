import { InjectQueue } from '@nestjs/bull'
import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { Queue } from 'bull'

@Controller('user')
export class UserController {
  constructor(@InjectQueue('user') private readonly userQueue: Queue) {
    userQueue.on('completed', (job, result) => {
      console.log(`Job completed with result ${result}`)
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    throw new ForbiddenException('user', 'not my fault')
  }

  @Post('count')
  async count() {
    const job = await this.userQueue.add('count', {
      file: 'wtf.mp3',
    })
    return job.id
  }

  @Post('jobState')
  async jobState() {
    return this.userQueue.count()
  }
}
