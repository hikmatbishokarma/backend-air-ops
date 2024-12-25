import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { BaseDTO } from 'src/common/dtos/base.dto';

export class SegmentsDTO {
  @ApiProperty({
    description: 'Departure location',
    example: 'Hyderabad',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  departure: string;

  @ApiProperty({
    description: 'Arrival location',
    example: 'Vijayawada',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  arrival: string;

  @ApiProperty({
    description: 'Estimated Time of Departure (ETD)',
    example: '2024-12-27T09:30:00Z',
  })
  @IsDateString()
  etd: string;

  @ApiProperty({
    description: 'Estimated Time of Arrival (ETA)',
    example: '2024-12-27T10:30:00Z',
  })
  @IsDateString()
  eta: string;

  @ApiProperty({ description: 'Number of Passengers', example: 4, minimum: 1 })
  @IsNumber()
  @Min(1)
  noOfPax: number;
}

export class TaxesDTO {
  @ApiProperty({ description: 'Type of tax', example: 'GST' })
  @IsString()
  taxType: string;

  @ApiProperty({
    description: 'Percentage of tax (optional)',
    example: 18,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  taxPercentage?: number;

  @ApiProperty({ description: 'Value of tax', example: 180 })
  @IsNumber()
  taxValue: number;
}

export class PricesDTO {
  @ApiProperty({ description: 'Base price', example: 100, minimum: 0 })
  @IsNumber()
  @Min(0)
  basePrice: number;

  @ApiProperty({ description: 'Duration in hours', example: 1, minimum: 0 })
  @IsNumber()
  @Min(0)
  duration: number;

  @ApiProperty({
    description: 'Ground handling charge',
    example: 100,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  groundHandlingChanrge: number;

  @ApiProperty({ description: 'Crew belting charge', example: 100, minimum: 0 })
  @IsNumber()
  @Min(0)
  crewBeltingCharge: number;

  @ApiProperty({ description: 'Miscellaneous charge', example: 10, minimum: 0 })
  @IsNumber()
  @Min(0)
  miscellaneousCharge: number;

  @ApiProperty({ description: 'List of taxes', type: [TaxesDTO] })
  @ValidateNested({ each: true })
  @Type(() => TaxesDTO)
  taxes: TaxesDTO[];
}

export class QuotationsDTO extends BaseDTO {
  @ApiProperty({ description: 'List of flight segments', type: [SegmentsDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SegmentsDTO)
  segments: SegmentsDTO[];

  @ApiProperty({ description: 'Price details', type: PricesDTO })
  @ValidateNested()
  @Type(() => PricesDTO)
  prices: PricesDTO;

  @ApiProperty({ description: 'Flight details', example: 'Flight A123' })
  @IsString()
  flight: string;

  @ApiProperty({
    description: 'Terms and conditions',
    example: 'No refunds on cancellation.',
  })
  @IsString()
  termsAndConditions: string;
}
