import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator'

export class CreateLibraryDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  name: string

  @IsOptional()
  note?: string

  @IsOptional()
  tags?: string
}
