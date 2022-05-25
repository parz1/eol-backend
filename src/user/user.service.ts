import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { UsersRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialDto)
  }

  async findOne(key: string | number) {
    if (typeof key === 'string') {
      return this.usersRepository.findOne({ username: key || null })
    }
    if (typeof key === 'number') {
      return this.usersRepository.findOne(key)
    }
  }
}
