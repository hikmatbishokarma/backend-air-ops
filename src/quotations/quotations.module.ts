import { Module } from '@nestjs/common';
import { QuotationsService } from './services/quotations.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuotationsEntity,
  QuotationsSchema,
} from './entities/quotations.entity';

import { QuitationsController } from './controllers/quotations.controller';
import {
  FlightInfoEntity,
  FlightInfoSchema,
} from './entities/flight-info.entity';
import { FlightInfoController } from './controllers/flight-info.controller';
import { FlightInfoService } from './services/flight-info.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuotationsEntity.name, schema: QuotationsSchema },
      { name: FlightInfoEntity.name, schema: FlightInfoSchema },
    ]),
  ],
  controllers: [QuitationsController, FlightInfoController],
  providers: [QuotationsService, FlightInfoService],
})
export class QuotationsModule {}
