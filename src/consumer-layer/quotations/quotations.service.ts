import { Injectable } from '@nestjs/common';
import { MongooseQueryService } from 'src/mongoose-query/mongoose-query.service';
import { QuotationsEntity } from './entities/quotations.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateQuotationNumber } from 'src/common/helper';
import { FlightInfoService } from 'src/provider-layer/quotations/flight-info/flight-info.service';

@Injectable()
export class QuotationsService extends MongooseQueryService<QuotationsEntity> {
  constructor(
    @InjectModel(QuotationsEntity.name) model: Model<QuotationsEntity>,
    private readonly flightInfoService: FlightInfoService,
  ) {
    super(model);
  }

  async createQuotation(body) {
    const quotationNumber = generateQuotationNumber('QUO');
    const payload = { ...body, quotationNumber };

    return await this.create(payload);
  }

  async Quotations() {
    try {
      const find = await this.findAll();
      if (find.length == 0) throw new Error('No Quotation Found');

      const flightIds = find.map((item) => item.flight);

      const flights = await this.flightInfoService.findAll(
        {
          _id: { $in: flightIds },
        },
        { createdAt: 0, updatedAt: 0, __v: 0 },
      );

      const flightMap = flights.reduce((acc, flight) => {
        acc[flight._id.toString()] = flight;
        return acc;
      }, {});

      const result = find.map((item) => {
        const flight = flightMap[item.flight];
        return {
          ...item.toObject(),
          flightDetails: flight,
        };
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
