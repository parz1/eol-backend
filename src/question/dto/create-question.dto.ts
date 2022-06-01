import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator'
import { CreateOptionDto } from './create-option.dto'

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

  options?: CreateOptionDto[]
}
