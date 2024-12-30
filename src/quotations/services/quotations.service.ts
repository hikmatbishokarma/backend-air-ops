import { BadRequestException, Injectable } from '@nestjs/common';
import { MongooseQueryService } from 'src/mongoose-query/mongoose-query.service';
import { QuotationsEntity } from '../entities/quotations.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateQuotationNumber } from 'src/common/helper';
import { FlightInfoService } from './flight-info.service';
import { QuotationState } from 'src/app-constants/enums';
import { DeepPartial } from 'src/common/deep-partial.type';

const { DRAFT, QUOTATED, SOLD, TERMINATED } = QuotationState;
const quotationWorkflowTransition = {
  draft: [QUOTATED],
  quotated: [SOLD, TERMINATED],
  terminated: [DRAFT],
};
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
    const payload = {
      ...body,
      code: quotationNumber,
      isLatest: true,
    };

    return await this.create(payload);
  }

  async Quotations() {
    try {
      // const find = await this.findAll({}, { __v: 0 }, { lean: true });
      // if (find.length == 0) throw new Error('No Quotation Found');

      // // const flightIds = find.map((item) => item.flight);

      // const uniqueFlightIds = [
      //   ...new Set(
      //     find.flatMap((item) =>
      //       item.segments.map((segment) => segment.flight),
      //     ),
      //   ),
      // ];

      // const flights = await this.flightInfoService.findAll(
      //   {
      //     _id: { $in: uniqueFlightIds },
      //   },
      //   { createdAt: 0, updatedAt: 0, __v: 0 },
      //   { lean: true },
      // );

      // const flightMap = flights.reduce((acc, flight) => {
      //   acc[flight._id.toString()] = flight;
      //   return acc;
      // }, {});

      // const result = find.map((item) => {
      //   const segmentsWithFlightDetails = item.segments.map((segment) => ({
      //     ...segment,
      //     flightDetails: flightMap[segment.flight],
      //   }));

      //   return {
      //     ...item,
      //     segments: segmentsWithFlightDetails,
      //   };
      // });
      // return result;
      const find = await this.findAll({}, { __v: 0 }, { lean: true });
      if (find.length === 0) throw new Error('No Quotation Found');

      // Step 1: Extract unique flight IDs from segments
      const flightMap = new Map<string, { segmentIds: string[] }>();

      find.forEach((quotation) => {
        quotation.segments.forEach((segment, index) => {
          const flightId = segment.flight;
          if (!flightMap.has(flightId)) {
            flightMap.set(flightId, { segmentIds: [] });
          }
          flightMap.get(flightId).segmentIds.push(segment.id);
        });
      });

      // Step 2: Fetch flight details
      const flightIds = Array.from(flightMap.keys());
      const flights = await this.flightInfoService.findAll(
        { _id: { $in: flightIds } },
        { createdAt: 0, updatedAt: 0, __v: 0 },
        { lean: true },
      );

      // Step 3: Combine flight details with segment mappings
      const flightDetails = flights.map((flight) => ({
        ...flight,
        segmentIds: flightMap.get(flight._id.toString()).segmentIds,
      }));

      // Step 4: Return transformed quotations
      const result = find.map((quotation) => ({
        ...quotation,
        flightDetails,
      }));

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQuotationState(id: string, state: QuotationState) {
    const quotation = await this.findOne({ _id: id });
    if (!quotation) {
      throw new BadRequestException('Quotation not found');
    }

    if (!this.isValidTransition(quotation.state, state)) {
      throw new BadRequestException(
        `Invalid state transition from ${quotation.state} to ${state}`,
      );
    }

    if (state === QuotationState.QUOTATED) {
      //TODO: notifiy customer
    }
    const updatedQuotation = await this.update(id, { state: state });
    return updatedQuotation;
  }

  async upgrade(code: string) {
    const draftQuotate = await this.findOne({
      code,
      state: QuotationState.DRAFT,
    });

    if (draftQuotate) {
      throw new BadRequestException('A draft version already exists');
    }

    const quotation = await this.findOne({
      code,
      state: QuotationState.QUOTATED,
    });
    if (!quotation) {
      throw new BadRequestException('No Quotated version exists');
    }

    const clonedQuotation: DeepPartial<QuotationsEntity> = {
      ...quotation.toObject(),
    };

    clonedQuotation.version += 1;
    clonedQuotation.state = QuotationState.DRAFT;
    delete clonedQuotation._id;

    const created = await this.create(clonedQuotation);
    await this.update(quotation._id.toString(), {
      isLatest: false,
      state: QuotationState.UPGRADED,
    });
    return created;
  }
  private isValidTransition(
    currentState: QuotationState,
    newState: QuotationState,
  ): boolean {
    return quotationWorkflowTransition[currentState].includes(newState);
  }
}
