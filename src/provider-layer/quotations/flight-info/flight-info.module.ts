import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FlightInfoEntity,
  FlightInfoSchema,
} from './entities/flight-info.entity';
import { FlightInfoController } from './flight-info.controller';
import { FlightInfoService } from './flight-info.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FlightInfoEntity.name, schema: FlightInfoSchema },
    ]),
  ],
  controllers: [FlightInfoController],
  providers: [FlightInfoService],
  exports: [FlightInfoService],
})
export class FlightInfoModule {}
