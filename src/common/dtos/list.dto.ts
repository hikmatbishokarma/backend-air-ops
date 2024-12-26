import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({ description: 'Page number', example: 1 })
  @IsNumber()
  page: number = 1;

  @ApiProperty({ description: 'Number of items per page', example: 20 })
  @IsNumber()
  perPage: number = 20;
}

export class SortDTO {
  @ApiProperty({ description: 'Field to sort by', example: 'id' })
  @IsString()
  field: string;

  @ApiProperty({
    description: 'Sort order',
    example: 'ASC',
    enum: ['ASC', 'DESC'],
  })
  @IsIn(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}

export class ListDTO {
  @ApiProperty({ type: PaginationDTO })
  pagination: PaginationDTO;

  @ApiProperty({ type: SortDTO })
  @IsOptional()
  sort?: SortDTO;

  @ApiProperty({ type: Object })
  @IsOptional()
  filter?: Record<string, any>;
}
