import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateOptionDto {
  @IsNotEmpty()
  optionText: string

  @IsNotEmpty()
  type: string

  @IsOptional()
  note?: string

  @IsOptional()
  tags?: string
}
