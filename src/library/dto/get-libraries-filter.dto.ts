import { IsOptional } from 'class-validator'
import { PaginationDto } from 'src/utils/pagination.dto'

export class GetLibrariesFilterDto extends PaginationDto {
  @IsOptional()
  search?: string

  @IsOptional()
  userId?: number
}
