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

import { Query as MongoQuery } from 'src/mongoose-query/interfaces/query.inteface';
import { FilterQueryBuilder } from 'src/mongoose-query/query/filter-query.builder';
import { DeepPartial } from 'src/common/deep-partial.type';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MQuery } from 'src/mongoose-query/query/query.dto';
import { UsersService } from './users.service';
import { UserDTO } from './dto/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll({}, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne({ _id: id }, { __v: 0 });
  }

  @Post('create')
  @ApiBody({
    description: 'Payload for creating a new user',
    type: UserDTO,
  })
  async create(@Body() body: DeepPartial<UserDTO>) {
    return this.userService.create(body);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the user to update' })
  @ApiBody({
    description: 'Payload for updating an existing user',
    type: UserDTO,
  })
  async update(@Param('id') id: string, @Body() roleDTO: Partial<UserDTO>) {
    return this.userService.update(id, roleDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
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
