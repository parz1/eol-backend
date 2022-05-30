import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator'
import { OptionEntity } from '../option/option.entity'

export class CreateQuestionDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  questionText: string

  @IsNotEmpty()
  type: string

  @IsOptional()
  note?: string

  @IsOptional()
  tags?: string

  options?: OptionEntity[]
}
