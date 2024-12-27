import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';
import { toJsonTransformPlugin } from 'src/mongoose-query/plugins';

@Schema({ collection: 'terms-and-conditions', timestamps: true })
export class TermsAndConditionsEntity extends BaseEntity {
  @Prop()
  termsAndConditions: string;
}

export const TermsAndConditionsSchema = SchemaFactory.createForClass(
  TermsAndConditionsEntity,
);
TermsAndConditionsSchema.plugin(toJsonTransformPlugin);
