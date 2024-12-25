import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TermsAndConditionsEntity,
  TermsAndConditionsSchema,
} from './entities/terms-and-conditions.entity';
import { TermsAndConditionsController } from './terms-and-conditions.controller';
import { TermsAndConditionsService } from './terms-and-conditions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TermsAndConditionsEntity.name, schema: TermsAndConditionsSchema },
    ]),
  ],
  controllers: [TermsAndConditionsController],
  providers: [TermsAndConditionsService],
})
export class TermsAndConditionsModule {}
