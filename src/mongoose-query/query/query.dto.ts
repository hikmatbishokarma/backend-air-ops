import { ApiProperty } from '@nestjs/swagger';

export class Paging {
  @ApiProperty({ description: 'Number of items per page', example: 10 })
  limit?: number;

  @ApiProperty({ description: 'Page number or offset', example: 0 })
  skip?: number;
}

export class SortField<T> {
  @ApiProperty({ description: 'Field name to sort by', example: 'name' })
  field: keyof T;

  @ApiProperty({
    description: 'Sort direction (1 for ascending, -1 for descending)',
    example: 1,
  })
  direction: 1 | -1;
}

export class MQuery<T> {
  @ApiProperty({
    description: 'Option to page through the collection',
    required: false,
    type: () => Paging,
  })
  paging?: Paging;

  @ApiProperty({
    description: 'Option to sort the collection',
    required: false,
    isArray: true,
    type: () => SortField,
  })
  sorting?: SortField<T>[];

  @ApiProperty({
    description: 'Filter criteria for the query',
    required: false,
    type: Object, // Customize further based on T
  })
  filter?: Partial<T>;
}
