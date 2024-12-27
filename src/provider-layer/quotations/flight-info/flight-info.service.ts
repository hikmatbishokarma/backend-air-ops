import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { MongooseQueryService } from 'src/mongoose-query/mongoose-query.service';
import { FlightInfoEntity } from './entities/flight-info.entity';

@Injectable()
export class FlightInfoService extends MongooseQueryService<FlightInfoEntity> {
  constructor(
    @InjectModel(FlightInfoEntity.name) model: Model<FlightInfoEntity>,
  ) {
    super(model);
  }
}
