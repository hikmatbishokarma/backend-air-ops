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
import {
  FilterQueryBuilder,
  MONGOOSE_SORT_DIRECTION,
} from 'src/mongoose-query/query/filter-query.builder';
import { DeepPartial } from 'src/common/deep-partial.type';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MQuery } from 'src/mongoose-query/query/query.dto';
import { ListDTO, PaginationDTO, SortDTO } from 'src/common/dtos/list.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  private readonly filterQueryBuilder: FilterQueryBuilder<RoleDTO>;
  constructor(private readonly roleService: RolesService) {
    this.filterQueryBuilder = new FilterQueryBuilder<RoleDTO>();
  }

  // @Get()
  // async getMany() {
  //   return this.roleService.findAll({}, {});
  // }

  @Get(':id')
  async getOne(@Param('id') id: string) {
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

  @Post()
  async getList(@Body() query: ListDTO) {
    const { pagination, sort, filter } = query;

    // Build the filter query, defaulting to an empty object if no filter is provided
    const filterQuery = filter
      ? this.filterQueryBuilder.createMongoFilter<RoleDTO>(filter)
      : {};

    // Build the sort query, defaulting to an empty object if no sort is provided
    const sortQuery = sort
      ? { [sort.field]: MONGOOSE_SORT_DIRECTION[sort.order] }
      : {};

    // Handle optional pagination
    const options = {
      page: pagination?.page,
      limit: pagination?.perPage,
      sort: sortQuery,
    };

    // Call the service method with the filter and options
    const { results, total } = await this.roleService.query(
      filterQuery,
      options,
    );
    return { data: results, total };
  }
}
