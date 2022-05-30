import { Exclude, Expose } from 'class-transformer'
import { LibraryEntity } from 'src/library/library.entity'
import { QuestionEntity } from 'src/question/question.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '自增ID',
  })
  id: number

  @Column('varchar', {
    nullable: false,
    unique: true,
    comment: '用户名',
  })
  username: string

  @Column('varchar', {
    nullable: true,
    unique: true,
    comment: '邮件',
  })
  email: string

  @Column('varchar', {
    nullable: false,
    comment: '密码',
    select: false,
  })
  password: string

  @OneToMany(() => LibraryEntity, (library) => library.user, { eager: false })
  libraries: LibraryEntity[]

  @OneToMany(() => QuestionEntity, (question) => question.user, {
    eager: false,
  })
  questions: QuestionEntity[]

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '修改时间',
  })
  updatedAt: Date
}
