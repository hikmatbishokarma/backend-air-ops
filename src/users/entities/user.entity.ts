import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { RoleType } from 'src/app-constants/enums';
import { BaseEntity } from 'src/common/entities/base.entity';

@Schema({ collection: 'users' })
export class UserEntity extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  password: string;

  @Prop()
  addresse: string;

  @Prop({ type: String, required: true, enum: RoleType })
  roleType: RoleType;

  @Prop({ type: Types.ObjectId, ref: 'RoleEntity', required: true })
  role: Types.ObjectId;
}
export const UserSchema = SchemaFactory.createForClass(UserEntity);
