import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';

import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';

@Module({
  imports: [
    RolesModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
