import { Exclude } from 'class-transformer'
import { BaseEntity } from 'src/utils/base'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { QuestionEntity } from '../question.entity'

@Entity('option')
export class OptionEntity extends BaseEntity {
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
  optionText: string

  @Column('varchar', {
    nullable: true,
    comment: '备注',
  })
  note: string

  @Column('varchar', {
    nullable: true,
    comment: '类型',
  })
  type: string

  @ManyToOne(() => QuestionEntity, (question) => question.option, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  question: QuestionEntity
}
