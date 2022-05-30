import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { UserEntity } from './user.entity'
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
    let user: UserEntity
    if (typeof key === 'string') {
      user = await this.usersRepository.findOne({ username: key || null })
    }
    if (typeof key === 'number') {
      user = await this.usersRepository.findOne({ id: key })
    }
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async getPassword(key: string | number) {
    if (typeof key === 'string') {
      return this.usersRepository.findOne(
        { username: key || null },
        {
          select: ['username', 'password', 'id'],
        },
      )
    }
    if (typeof key === 'number') {
      return this.usersRepository.findOne(key, {
        select: ['username', 'password', 'id'],
      })
    }
  }
}
