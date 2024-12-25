import { Injectable } from '@nestjs/common';
import { MongooseQueryService } from 'src/mongoose-query/mongoose-query.service';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TermsAndConditionsEntity } from './entities/terms-and-conditions.entity';

@Injectable()
export class TermsAndConditionsService extends MongooseQueryService<TermsAndConditionsEntity> {
  constructor(
    @InjectModel(TermsAndConditionsEntity.name)
    model: Model<TermsAndConditionsEntity>,
  ) {
    super(model);
  }
}
