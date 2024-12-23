import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDTO {
  // id!: string;

  @ApiProperty({ description: 'Timestamp of creation', readOnly: true })
  createdAt?: Date;

  @ApiProperty({ description: 'User who created the record', readOnly: true })
  createdBy?: string;

  @ApiProperty({ description: 'Timestamp of last update', readOnly: true })
  updatedAt?: Date;

  @ApiProperty({
    description: 'User who last updated the record',
    readOnly: true,
  })
  updatedBy?: string;

  @ApiProperty({ description: 'Timestamp of deletion', readOnly: true })
  deletedAt?: Date;

  @ApiProperty({ description: 'User who deleted the record', readOnly: true })
  deletedBy?: string;

  @ApiProperty({ description: 'status for toggle active and inactive' })
  status: boolean;
}
