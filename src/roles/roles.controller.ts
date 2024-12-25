import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';

import { RoleDTO } from './dto/roles.dto';
import { Query as MongoQuery } from 'src/mongoose-query/interfaces/query.inteface';
import { FilterQueryBuilder } from 'src/mongoose-query/query/filter-query.builder';
import { DeepPartial } from 'src/common/deep-partial.type';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MQuery } from 'src/mongoose-query/query/query.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  private readonly filterQueryBuilder: FilterQueryBuilder<RoleDTO>;
  constructor(private readonly roleService: RolesService) {
    this.filterQueryBuilder = new FilterQueryBuilder<RoleDTO>();
  }

  @Get()
  async findAll() {
    return this.roleService.findAll({}, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roleService.findOne({ _id: id }, { __v: 0 });
  }

  @Post('create')
  @ApiBody({
    description: 'Payload for creating a new role',
    type: RoleDTO,
  })
  async create(@Body() body: DeepPartial<RoleDTO>) {
    return this.roleService.create(body);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the role to update' })
  @ApiBody({
    description: 'Payload for updating an existing role',
    type: RoleDTO,
  })
  async update(@Param('id') id: string, @Body() roleDTO: Partial<RoleDTO>) {
    return this.roleService.update(id, roleDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }

  // @Get('paginate')
  // @ApiQuery({
  //   name: 'query',
  //   description: 'Query object for pagination and filtering',
  //   required: false,
  //   type: MongoQuery<RoleDTO>, // Ensure you define or import this type properly
  // })
  // async findAllWithPagination(@Query('query') query: MongoQuery<RoleDTO>) {
  //   const { filterQuery, options } = this.filterQueryBuilder.buildQuery(query);

  //   return await this.roleService.query(filterQuery.filter, options);
  // }

  // @Post('paginate')
  // @ApiBody({
  //   description: 'Query object for pagination and filtering',
  //   type: MQuery, // Use the class here
  // })
  // async findAllWithPagination(@Body() query: MQuery<RoleDTO>) {
  //   // const { filterQuery, options } = this.filterQueryBuilder.buildQuery(query);

  //   // return await this.roleService.query(filterQuery.filter, options);
  //   return 'jh';
  // }
}
