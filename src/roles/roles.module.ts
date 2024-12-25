import { Module } from '@nestjs/common';
import { RoleEntity, RoleSchema } from './entities/roles.entity';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoleEntity.name, schema: RoleSchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
