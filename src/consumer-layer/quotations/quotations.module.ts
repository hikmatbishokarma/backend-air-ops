import { Module } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { QuitationsController } from './quotations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuotationsEntity,
  QuotationsSchema,
} from './entities/quotations.entity';
import { FlightDetailsModule } from 'src/provider-layer/flight-details/flight-details.module';

@Module({
  imports: [
    FlightDetailsModule,
    MongooseModule.forFeature([
      { name: QuotationsEntity.name, schema: QuotationsSchema },
    ]),
  ],
  controllers: [QuitationsController],
  providers: [QuotationsService],
})
export class QuotationsModule {}
