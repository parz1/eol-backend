import { Exclude, Expose } from 'class-transformer'
import { QuestionEntity } from 'src/question/question.entity'
import { UserEntity } from 'src/user/user.entity'
import { BaseEntity } from 'src/utils/base'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('library')
export class LibraryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '自增ID',
  })
  id: number

  @Column('varchar', {
    nullable: false,
    unique: false,
    comment: '题库名',
  })
  name: string

  @Column('varchar', {
    nullable: true,
    comment: '备注',
  })
  note: string

  @Column('varchar', {
    nullable: true,
    comment: '标签',
  })
  tags: string

  @ManyToOne(() => UserEntity, (user) => user.libraries, { eager: true })
  @Exclude({
    toPlainOnly: true,
  })
  user: UserEntity

  @OneToMany(() => QuestionEntity, (question) => question.library, {
    eager: false,
  })
  questions: QuestionEntity[]
}
