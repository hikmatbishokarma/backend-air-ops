import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';

@Schema({ _id: false })
export class SegmentsSchema {
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
}

@Schema({ _id: false })
export class TaxesSchema {
  @Prop({ type: String, required: true })
  taxType: string;

  @Prop({ type: Number })
  taxPercentage?: number;

  @Prop({ type: Number, required: true })
  taxValue: number;
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

  @Prop({ type: [TaxesSchema], required: true, _id: false })
  taxes: TaxesSchema[];
}

@Schema({ collection: 'quotations', timestamps: true })
export class QuotationsEntity extends BaseEntity {
  @Prop({ type: String, required: true, unique: true })
  quotationNumber: string;
  @Prop({ type: [SegmentsSchema], required: true, _id: false })
  segments: SegmentsSchema[];

  @Prop({ type: Object, required: true, _id: false })
  prices: PricesSchema;

  @Prop({ type: String, required: true })
  flight: string;

  @Prop({ type: String, required: true })
  termsAndConditions: string;
}

export const QuotationsSchema = SchemaFactory.createForClass(QuotationsEntity);
