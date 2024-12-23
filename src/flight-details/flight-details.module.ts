import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FlightDetailsEntity,
  FlightDetailsSchema,
} from './entities/flight-details.entity';
import { FlightDetailsController } from './flight-detail.controller';
import { FlightDetailsService } from './flight-details.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FlightDetailsEntity.name, schema: FlightDetailsSchema },
    ]),
  ],
  controllers: [FlightDetailsController],
  providers: [FlightDetailsService],
})
export class FlightDetailsModule {}
