import { Module } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { QuitationsController } from './quotations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuotationsEntity,
  QuotationsSchema,
} from './entities/quotations.entity';
import { FlightInfoModule } from 'src/provider-layer/quotations/flight-info/flight-info.module';

@Module({
  imports: [
    FlightInfoModule,
    MongooseModule.forFeature([
      { name: QuotationsEntity.name, schema: QuotationsSchema },
    ]),
  ],
  controllers: [QuitationsController],
  providers: [QuotationsService],
})
export class QuotationsModule {}
