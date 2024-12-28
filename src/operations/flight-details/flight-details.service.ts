import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { MongooseQueryService } from 'src/mongoose-query/mongoose-query.service';
import { FlightDetailsEntity } from './entities/flight-details.entity';

@Injectable()
export class FlightDetailsService extends MongooseQueryService<FlightDetailsEntity> {
  constructor(
    @InjectModel(FlightDetailsEntity.name) model: Model<FlightDetailsEntity>,
  ) {
    super(model);
  }
}
