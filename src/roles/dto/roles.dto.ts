import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { RoleType } from 'src/app-constants/enums';

import { BaseDTO } from 'src/common/dtos/base.dto';

export class RoleDTO extends BaseDTO {
  @ApiProperty({ description: 'Role Type', enum: RoleType, example: 'ADMIN' })
  roleType: RoleType;
  @ApiProperty({ description: 'Name of the Role', example: 'Admin' })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Description About Role',
    example: 'Admin have All Access',
  })
  @IsString()
  description: string;
}
