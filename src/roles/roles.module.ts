import { Module } from '@nestjs/common';
import { RoleEntity, RoleSchema } from './entities/roles.entity';
import { RolesService } from './services/roles.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoleEntity.name, schema: RoleSchema }]),
  ],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
