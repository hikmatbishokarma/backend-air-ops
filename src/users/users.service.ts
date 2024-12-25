import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/users.dto';

import { UserEntity } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseQueryService } from 'src/mongoose-query/mongoose-query.service';
import { RoleEntity } from 'src/roles/entities/roles.entity';

@Injectable()
export class UsersService extends MongooseQueryService<UserEntity> {
  constructor(@InjectModel(UserEntity.name) model: Model<UserEntity>) {
    super(model);
  }
}
