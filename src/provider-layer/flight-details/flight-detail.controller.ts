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
import { FlightDetailsDTO } from './dto/flight-details.dto';
import { FlightDetailsService } from './flight-details.service';

@ApiTags('Flight Details')
@Controller('flight-detials')
export class FlightDetailsController {
  constructor(private readonly flightDetails: FlightDetailsService) {}

  @Get()
  async findAll() {
    return this.flightDetails.findAll({}, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.flightDetails.findOne({ _id: id }, { __v: 0 });
  }

  @Post('create')
  @ApiBody({
    description: 'Payload for creating a new Flight Detail',
    type: FlightDetailsDTO,
  })
  async create(@Body() body: DeepPartial<FlightDetailsDTO>) {
    return this.flightDetails.create(body);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the role to update' })
  @ApiBody({
    description: 'Payload for updating an existing role',
    type: FlightDetailsDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() body: Partial<FlightDetailsDTO>,
  ) {
    return this.flightDetails.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.flightDetails.delete(id);
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

  //   return await this.flightDetails.query(filterQuery.filter, options);
  // }

  // @Post('paginate')
  // @ApiBody({
  //   description: 'Query object for pagination and filtering',
  //   type: MQuery, // Use the class here
  // })
  // async findAllWithPagination(@Body() query: MQuery<RoleDTO>) {
  //   // const { filterQuery, options } = this.filterQueryBuilder.buildQuery(query);

  //   // return await this.flightDetails.query(filterQuery.filter, options);
  //   return 'jh';
  // }
}
