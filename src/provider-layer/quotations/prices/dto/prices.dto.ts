import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn } from 'class-validator';
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
  groundHandlingCharge: number;
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

  @ApiProperty({
    description: 'Sort order',
    example: ['isSGST'],
    enum: ['isSGST', 'isCGST', 'isIGST'],
  })
  @IsArray()
  @IsIn(['isSGST', 'isCGST', 'isIGST'], { each: true }) // Validates each item in the array
  taxes: string[];
  // @ApiProperty({
  //   description: 'SGST @9%: 0.09',
  //   default: false,
  // })
  // isSGST: boolean;
  // @ApiProperty({
  //   description: 'isCGST @9%: 0.09',
  //   default: false,
  // })
  // isCGST: boolean;
  // @ApiProperty({
  //   description: '@18%: 0.18',
  //   default: false,
  // })
  // isIGST: boolean;
}
