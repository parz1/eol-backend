import { IsNotEmpty } from 'class-validator'

export class PaginationDto {
  @IsNotEmpty()
  pageC: number

  @IsNotEmpty()
  pageIdx: number
}
