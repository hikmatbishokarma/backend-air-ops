import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';

@Schema({ collection: 'terms-and-conditions', timestamps: true })
export class TermsAndConditionsEntity extends BaseEntity {
  @Prop()
  termsAndConditions: string;
}

export const TermsAndConditionsSchema = SchemaFactory.createForClass(
  TermsAndConditionsEntity,
);
