import { IsOptional } from 'class-validator'
import { PaginationDto } from 'src/utils/pagination.dto'

export class GetQuestionsFilterDto extends PaginationDto {
  @IsOptional()
  search?: string

  @IsOptional()
  userId?: number
}
