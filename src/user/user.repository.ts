import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { UserEntity } from './user.entity'

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createUser(authCredentialDto: AuthCredentialsDto) {
    const { username, password } = authCredentialDto
    const user = this.create({
      username,
      password,
    })
    try {
      await this.save(user)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // duplicate username
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
