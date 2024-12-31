import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { QuotationState, TaxType } from 'src/app-constants/enums';
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
  @Min(4)
  noOfPax: number;

  @ApiProperty({
    description: 'Flight ID (MongoDB ObjectId)',
    example: '60c72b2f9f1b2c001c8e4a3b',
  })
  @IsString()
  @IsMongoId()
  flight: string;
}

export class TaxesDTO {
  @ApiProperty({ description: 'Type of tax', example: 'GST' })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Percentage of tax (optional)',
    example: 18,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  percentage?: number;

  @ApiProperty({ description: 'Value of tax', example: 180 })
  @IsNumber()
  value: number;
}

export class QuotePricesDTO {
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
  groundHandlingCharge: number;

  @ApiProperty({ description: 'Crew belting charge', example: 100, minimum: 0 })
  @IsNumber()
  @Min(0)
  crewBeltingCharge: number;

  @ApiProperty({ description: 'Miscellaneous charge', example: 10, minimum: 0 })
  @IsNumber()
  @Min(0)
  miscellaneousCharge: number;

  // @ApiProperty({ description: 'List of taxes', type: [TaxesDTO] })
  // @ValidateNested({ each: true })
  // taxes: TaxesDTO[];

  @ApiProperty({
    description: 'Sort order',
    example: ['SGST'],
    enum: TaxType,
  })
  @IsArray()
  @IsIn([TaxType], { each: true }) // Validates each item in the array
  taxes: string[];
}

export class QuotationsDTO extends BaseDTO {
  @ApiProperty({
    description: 'quotaion code to track quotation',
    readOnly: true,
  })
  code: string;
  @ApiProperty({
    description: 'Sort order',
    enum: QuotationState,
    default: QuotationState.DRAFT,
  })
  state: QuotationState;
  @ApiProperty({
    description: 'version number',
    readOnly: true,
  })
  version: number;
  @ApiProperty({
    description: 'check if this is latest version',
    readOnly: true,
  })
  isLatest: boolean;

  @ApiProperty({ description: 'List of flight segments', type: [SegmentsDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  segments: SegmentsDTO[];

  @ApiProperty({ description: 'Price details', type: QuotePricesDTO })
  @ValidateNested({ each: true })
  prices: QuotePricesDTO;
}

export class UpdateQuotationStateDTO {
  @ApiProperty({
    description: 'Quotation ID',
    example: '60c72b2f9f1b2c001c8e4a3b',
  })
  @IsString()
  @IsMongoId()
  id: string;
  @ApiProperty({
    description: 'Quotation State to be updated',
    enum: QuotationState,
    default: QuotationState.DRAFT,
  })
  state: QuotationState;
}

export class UpgradeQuotationDTO {
  @ApiProperty({
    description: 'The code of the quotation to upgrade',
    type: String,
  })
  @IsString()
  code: string;
}
