import {
  OnQueueActive,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('user')
export class UserProcessor {
  private readonly logger = new Logger(UserProcessor.name, true)

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    )
  }
  @OnQueueProgress()
  onProgress(job: Job, progress: number) {
    this.logger.verbose(`Resolving ${job.name}#${job.id}... ${progress}`)
  }

  @Process('transcode')
  async handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...')
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.logger.verbose('Resolving ' + job.name + '...')
        resolve(true)
      }, 1000)
    })
    this.logger.debug(job.name)
    this.logger.debug('Transcoding completed')
    return {}
  }

  @Process('count')
  async transcode(job: Job<unknown>) {
    this.logger.debug('Start counting...')
    let progress = 0
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          this.logger.verbose(`Resolving ${job.name}#${i}... ${job.progress}`)
          resolve(job.data)
        }, 1000)
      })
      progress += 10
      await job.progress(progress)
    }
    return job
  }
}
