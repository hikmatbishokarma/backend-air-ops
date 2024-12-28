import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { BaseDTO } from 'src/common/dtos/base.dto';

export class PFMCDTO {
  @ApiProperty({
    description: 'PFMC1 or PFMC2',
    example: 'PFMC1',
  })
  @IsString()
  type: String;
  @ApiProperty({
    description: 'captain name',
    example: 'Hikmat',
  })
  @IsString()
  captain: String;
  @ApiProperty({
    description: 'co-pilot name',
    example: 'Hikmat1',
  })
  @IsString()
  coPilot: String;
  @ApiProperty({
    description: 'reserve pilot name',
    example: 'Hikmat2',
  })
  @IsString()
  @IsOptional()
  reservePilot1: String;
  @ApiProperty({
    description: 'reserve pilot name',
    example: 'Hikmat1',
  })
  @IsString()
  @IsOptional()
  reservePilot2: String;
  @ApiProperty({
    description: 'engineer name',
    example: 'Hikmat1',
  })
  @IsString()
  engineer: String;
  @ApiProperty({
    description: 'cabin crew name',
    example: 'Hikmat1',
  })
  @IsString()
  cabinCrew: String;
  @ApiProperty({
    description: 'operations name',
    example: 'Hikmat1',
  })
  @IsString()
  operations: String;
  @ApiProperty({
    description: 'doctor name',
    example: 'Hikmat1',
  })
  @IsString()
  doctorName: String;
  @ApiProperty({
    description: 'alternate doctor name',
    example: 'Hikmat1',
  })
  @IsOptional()
  alternateDoctor: String;
  @ApiProperty({
    description: 'report path',
  })
  report: String;
  @ApiProperty({
    description: 'report video path',
  })
  video: String;
}

export class SectorDTO {
  @ApiProperty({
    description: 'Departure location',
    example: 'Hyderabad',
    maxLength: 100,
  })
  @IsString()
  depatureDate: string;
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
  @ApiProperty({ description: 'manifest upload path' })
  @IsString()
  manifest: string;
}

export class fuelDTO {
  @ApiProperty({
    description: 'Fuel On Arrival',
    example: '100 LBS',
  })
  @IsString()
  fuelOnArrival: string;
  @ApiProperty({
    description: 'Fuel On Arrival',
    example: '50 LBS',
  })
  @IsString()
  fuelUpload: string;
  @ApiProperty({
    description: 'voucher upload path',
  })
  @IsString()
  fuelVoucher?: string;
  @ApiProperty({
    description: 'Fuel On Arrival',
    example: '50 LBS',
  })
  @IsString()
  fuelOnGage: string;
}

export class tripkitDTO {
  @ApiProperty({
    description: 'Flight Plan Copy Upload path',
  })
  @IsString()
  flightPlan: String;
  @ApiProperty({
    description: 'Weather Briefing Upload path',
  })
  @IsString()
  weatherBriefing: String;
  @ApiProperty({
    description: 'notams Upload path',
  })
  @IsString()
  notams: String;
  @ApiProperty({
    description: 'other Uploads',
    type: [String],
  })
  otherUploads: [String];
  @ApiProperty({
    description: 'load trim CG',
  })
  @IsString()
  loadTrimCG: String;
}
export class FlightDetailsDTO extends BaseDTO {
  @ApiProperty({
    description: 'Flight Id',
    example: '1234567890',
    readOnly: true,
  })
  @IsString()
  flightId: string;
  @ApiProperty({
    description: 'Name of Flight',
    example: 'VTNAV',
  })
  @IsString()
  tailNo: String;
  @ApiProperty({
    description: 'Depature date and time',
    example: '27-12-2024 9:30am',
  })
  @IsString()
  depatureDate: string;
  @ApiProperty({
    type: [PFMCDTO],
  })
  pfmc: [PFMCDTO];
  @ApiProperty({
    type: [SectorDTO],
  })
  sectors: [SectorDTO];
  @ApiProperty({
    type: fuelDTO,
  })
  fuel: fuelDTO;
  @ApiProperty({
    type: tripkitDTO,
  })
  tripkit: tripkitDTO;
}
