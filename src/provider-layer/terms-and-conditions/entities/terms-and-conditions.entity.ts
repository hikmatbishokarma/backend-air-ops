import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';

export class TermsAndConditionsEntity extends BaseEntity {
  @Prop()
  termsAndConditions: string;
}

export const TermsAndConditionsSchema = SchemaFactory.createForClass(
  TermsAndConditionsEntity,
);
