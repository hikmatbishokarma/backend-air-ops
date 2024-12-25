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

import { FilterQueryBuilder } from 'src/mongoose-query/query/filter-query.builder';
import { DeepPartial } from 'src/common/deep-partial.type';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { FlightDetailsDTO } from './dto/flight-details.dto';
import { FlightDetailsService } from './flight-details.service';

@ApiTags('Flight Details')
@Controller('flight-detials')
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

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  async listPaginated(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const paginationData = await this.flightDetails.query(
      {},
      { page: Number(page), limit: Number(limit) },
    );
    return paginationData;
  }

  @Post('filter')
  @ApiBody({
    description: 'Flight filter parameters',
    type: Object, // You can create a DTO for this if needed
  })
  async filterResources(@Body() body: any) {
    const filter =
      this.filterQueryBuilder.createMongoFilter<FlightDetailsDTO>(body);
    return this.flightDetails.findWithFilter(filter);
  }
}
