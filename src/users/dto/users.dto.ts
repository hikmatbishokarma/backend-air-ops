import { IsEmail, IsMobilePhone } from 'class-validator';

import { BaseDTO } from 'src/common/dtos/base.dto';
import { RoleDTO } from 'src/roles/dto/roles.dto';

import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from 'src/app-constants/enums';

export class UserDTO extends BaseDTO {
  @ApiProperty({ description: 'User Name', example: 'Hikmat' })
  name: string;

  @Exclude()
  @ApiProperty({ description: 'User Password', example: '**###' })
  password: string;

  @IsEmail()
  @ApiProperty({ description: 'User Email', example: 'email@gmail.com' })
  email: string;

  @IsMobilePhone()
  @ApiProperty({ description: 'User Phone Number', example: '887276276' })
  phone: string;

  @ApiProperty({ description: 'User Address', example: 'hyderabad' })
  addresse: string;

  @ApiProperty({ description: 'User Role Type', example: 'Admin' })
  roleType: RoleType;

  @ApiProperty({ description: 'User Phone Number', example: 'siteAdmin' })
  role: string;
}
