import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendCode(mail: string, code: string): Promise<any> {
    return await this.mailerService
      .sendMail({
        to: mail,
        subject: 'Check your Code to verify',
        text: `Your code: `, // plaintext body
        html: `<h1>${code}</h1>`, // HTML body content
      })
      .catch((err) => {
        console.log(err)
        throw new InternalServerErrorException('send mail error')
      })
  }
}
