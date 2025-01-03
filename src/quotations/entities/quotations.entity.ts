import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { QuotationState } from 'src/app-constants/enums';
import { BaseEntity } from 'src/common/entities/base.entity';
import { toJsonTransformPlugin } from 'src/mongoose-query/plugins';
import { v4 as uuid } from 'uuid';

@Schema({ _id: false })
export class SegmentsSchema {
  @Prop({ type: String, default: () => uuid() }) // Generate unique ID
  id: string;
  @Prop({ type: String, required: true, maxlength: 100 })
  departure: string;

  @Prop({ type: String, required: true, maxlength: 100 })
  arrival: string;

  @Prop({ type: Date, required: true })
  etd: Date;

  @Prop({ type: Date, required: true })
  eta: Date;

  @Prop({ type: Number, required: true, min: 1 })
  noOfPax: number;

  @Prop({ type: String, required: true })
  // @Prop({ type: String, ref: 'flight-info', required: true }) // <-- Updated
  flight: string;
}

@Schema({ _id: false })
export class TaxesSchema {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Number })
  percentage?: number;

  @Prop({ type: Number, required: true })
  value: number;
}

@Schema({ _id: false })
export class PricesSchema {
  @Prop({ type: Number, required: true, min: 0 })
  basePrice: number;

  @Prop({ type: Number, required: true, min: 0 })
  duration: number;

  @Prop({ type: Number, required: true, min: 0 })
  groundHandlingCharge: number;

  @Prop({ type: Number, required: true, min: 0 })
  crewBeltingCharge: number;

  @Prop({ type: Number, required: true, min: 0 })
  miscellaneousCharge: number;

  // @Prop({ type: [TaxesSchema], required: true, _id: false })
  // taxes: TaxesSchema[];
  @Prop({ type: [String] })
  taxes: string[];
}

@Schema({ collection: 'quotations', timestamps: true })
export class QuotationsEntity extends BaseEntity {
  @Prop({ type: String, required: true })
  code: string;
  @Prop({ enum: QuotationState, default: QuotationState.DRAFT })
  state: QuotationState;
  @Prop({ type: Number, required: true, default: 1 })
  version: number;
  @Prop({ type: Boolean, required: true, default: true })
  isLatest: boolean;

  @Prop({ type: [SegmentsSchema], required: true, _id: false })
  segments: SegmentsSchema[];

  @Prop({ type: Object, required: true, _id: false })
  prices: PricesSchema;
}

export const QuotationsSchema = SchemaFactory.createForClass(QuotationsEntity);
QuotationsSchema.index({ code: 1 });
QuotationsSchema.plugin(toJsonTransformPlugin);
