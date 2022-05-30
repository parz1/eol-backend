import { IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateLibraryDto {
  @IsNotEmpty()
  id: number

  @IsOptional()
  name?: string

  @IsOptional()
  note?: string

  @IsOptional()
  tags?: string
}
