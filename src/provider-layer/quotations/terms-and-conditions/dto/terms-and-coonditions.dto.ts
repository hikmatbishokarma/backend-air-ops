import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/dtos/base.dto';

export class TermsAndConditionsDTO extends BaseDTO {
  @ApiProperty({ description: 'Flights/Helicoptor Terms and Conditions' })
  termsAndConditions: string;
}
