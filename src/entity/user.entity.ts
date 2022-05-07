import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '自增ID',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    comment: '用户名',
  })
  username: string;
}
