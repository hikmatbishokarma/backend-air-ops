import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/dtos/base.dto';

// export class TaxesDTO{
//     taxType: string;
//     taxPercentage: number;
//     taxValue: number;
// }
export class PricesDTO extends BaseDTO {
  @ApiProperty({
    description: 'Base Price',
    default: 0,
    example: 100,
    minimum: 0,
  })
  basePrice: number;
  @ApiProperty({ description: 'Duration', default: 0, example: 1, minimum: 0 })
  duration: number;
  @ApiProperty({
    description: 'Ground Handling Charge',
    default: 0,
    example: 100,
    minimum: 0,
  })
  groundHandlingChanrge: number;
  @ApiProperty({
    description: 'Crew Belting Charge',
    default: 0,
    example: 100,
    minimum: 0,
  })
  crewBeltingCharge: number;
  @ApiProperty({
    description: 'MiscellaneousCharge',
    default: 0,
    example: 10,
    minimum: 0,
  })
  miscellaneousCharge: number;
  // taxes:TaxesDTO[];
}
