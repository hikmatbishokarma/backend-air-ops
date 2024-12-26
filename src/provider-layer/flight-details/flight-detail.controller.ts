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

import {
  FilterQueryBuilder,
  MONGOOSE_SORT_DIRECTION,
} from 'src/mongoose-query/query/filter-query.builder';
import { DeepPartial } from 'src/common/deep-partial.type';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { FlightDetailsDTO } from './dto/flight-details.dto';
import { FlightDetailsService } from './flight-details.service';
import { ListDTO } from 'src/common/dtos/list.dto';

@ApiTags('Flight Details')
@Controller('flight-details')
export class FlightDetailsController {
  private readonly filterQueryBuilder: FilterQueryBuilder<FlightDetailsDTO>;
  constructor(private readonly flightDetails: FlightDetailsService) {
    this.filterQueryBuilder = new FilterQueryBuilder<FlightDetailsDTO>();
  }

  @Get('list')
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

  // @Get()
  // @ApiQuery({
  //   name: 'page',
  //   required: false,
  //   type: Number,
  //   description: 'Page number',
  // })
  // @ApiQuery({
  //   name: 'limit',
  //   required: false,
  //   type: Number,
  //   description: 'Items per page',
  // })
  // async listPaginated(
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 10,
  // ) {
  //   const paginationData = await this.flightDetails.query(
  //     {},
  //     { page: Number(page), limit: Number(limit) },
  //   );
  //   return paginationData;
  // }

  // @Post('filter')
  // @ApiBody({
  //   description: 'Flight filter parameters',
  //   type: Object, // You can create a DTO for this if needed
  // })
  // async filterResources(@Body() body: any) {
  //   const filter =
  //     this.filterQueryBuilder.createMongoFilter<FlightDetailsDTO>(body);
  //   return this.flightDetails.findWithFilter(filter);
  // }

  @Post()
  async getList(@Body() query: ListDTO) {
    const { pagination, sort, filter } = query;

    // Build the filter query, defaulting to an empty object if no filter is provided
    const filterQuery = filter
      ? this.filterQueryBuilder.createMongoFilter<FlightDetailsDTO>(filter)
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
    const { results, total } = await this.flightDetails.query(
      filterQuery,
      options,
    );
    return { data: results, total };
  }
}
