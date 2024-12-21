import { IsString } from 'class-validator';
import { RoleType } from 'src/app-constants/enums';

import { BaseDTO } from 'src/common/dtos/base.dto';

export class RoleDTO extends BaseDTO {
  roleType: RoleType;
  @IsString()
  name: string;
  @IsString()
  description: string;
}
