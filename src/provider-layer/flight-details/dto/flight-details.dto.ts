import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/dtos/base.dto';

export class specificationsDTO {
  @ApiProperty()
  icon: string;
  @ApiProperty()
  name: string;
}
export class FlightDetailsDTO extends BaseDTO {
  @ApiProperty({ description: 'Flight/Helicopter Code', example: 'VTBHH' })
  code: string;
  @ApiProperty({
    description: 'Flight/Helicopter Name',
    example: 'Twin-Engine Helicopter',
  })
  name: string;
  @ApiProperty({
    description: 'Flight/Helicopter Model',
    example: 'Twin-Engine Helicopter with 6 seats',
  })
  description: string;
  @ApiProperty({ description: 'Flight/Helicopter Model' })
  image: string;
  @ApiProperty({
    description: 'Flight/Helicopter Model',
    type: [specificationsDTO],
  })
  specifications: specificationsDTO[];
}
