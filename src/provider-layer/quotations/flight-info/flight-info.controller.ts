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

import { FlightInfoDTO } from './dto/flight-info.dto';
import { FlightInfoService } from './flight-info.service';
import { ListDTO } from 'src/common/dtos/list.dto';

@ApiTags('Flight Info')
@Controller('flight-info')
export class FlightInfoController {
  private readonly filterQueryBuilder: FilterQueryBuilder<FlightInfoDTO>;
  constructor(private readonly flightInfo: FlightInfoService) {
    this.filterQueryBuilder = new FilterQueryBuilder<FlightInfoDTO>();
  }

  @Get('list')
  async findAll() {
    return this.flightInfo.findAll({}, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.flightInfo.findOne({ _id: id }, { __v: 0 });
  }

  @Post('create')
  @ApiBody({
    description: 'Payload for creating a new Flight Info',
    type: FlightInfoDTO,
  })
  async create(@Body() body: DeepPartial<FlightInfoDTO>) {
    return this.flightInfo.create(body);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the role to update' })
  @ApiBody({
    description: 'Payload for updating an existing role',
    type: FlightInfoDTO,
  })
  async update(@Param('id') id: string, @Body() body: Partial<FlightInfoDTO>) {
    return this.flightInfo.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.flightInfo.delete(id);
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
  //   const paginationData = await this.flightInfo.query(
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
  //     this.filterQueryBuilder.createMongoFilter<FlightInfoDTO>(body);
  //   return this.flightInfo.findWithFilter(filter);
  // }

  @Post()
  async getList(@Body() query: ListDTO) {
    const { pagination, sort, filter } = query;

    // Build the filter query, defaulting to an empty object if no filter is provided
    const filterQuery = filter
      ? this.filterQueryBuilder.createMongoFilter<FlightInfoDTO>(filter)
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
    const { results, total } = await this.flightInfo.query(
      filterQuery,
      options,
    );
    return { data: results, total };
  }
}
