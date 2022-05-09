import {
  Column,
  CreateDateColumn,
  Entity,
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
    nullable: false,
    unique: true,
    comment: '邮件',
  })
  email: string

  @Column('varchar', {
    nullable: false,
    comment: '密码',
  })
  password: string

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
