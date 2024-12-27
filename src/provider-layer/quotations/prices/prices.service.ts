import { Injectable } from '@nestjs/common';
import { MongooseQueryService } from 'src/mongoose-query/mongoose-query.service';
import { PricesEntity } from './entities/prices.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PricesService extends MongooseQueryService<PricesEntity> {
  constructor(@InjectModel(PricesEntity.name) model: Model<PricesEntity>) {
    super(model);
  }
}
