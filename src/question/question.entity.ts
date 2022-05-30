import { Exclude } from 'class-transformer'
import { LibraryEntity } from 'src/library/library.entity'
import { UserEntity } from 'src/user/user.entity'
import { BaseEntity } from 'src/utils/base'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OptionEntity } from './option/option.entity'

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '自增ID',
  })
  id: number

  @Column('varchar', {
    nullable: false,
    unique: true,
    comment: '题干',
  })
  questionText: string

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

  @Column('varchar', {
    nullable: true,
    comment: '类型',
  })
  type: string

  @OneToMany(() => OptionEntity, (option) => option.question, {
    eager: false,
  })
  options: []

  @ManyToOne(() => LibraryEntity, (library) => library.questions, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  library: LibraryEntity

  @ManyToOne(() => UserEntity, (user) => user.questions, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  user: UserEntity
}
