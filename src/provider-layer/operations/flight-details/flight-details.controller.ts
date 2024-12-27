import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FlightDetailsService } from './flight-details.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { FlightDetailsDTO } from './dto/flight-details.dto';
import { DeepPartial } from 'src/common/deep-partial.type';
import {
  FilterQueryBuilder,
  MONGOOSE_SORT_DIRECTION,
} from 'src/mongoose-query/query/filter-query.builder';
import { ListDTO } from 'src/common/dtos/list.dto';
import { generateQuotationNumber } from 'src/common/helper';

@ApiTags('Flight Details')
@Controller('flight-details')
export class FlightDetailsController {
  private readonly filterQueryBuilder: FilterQueryBuilder<FlightDetailsDTO>;
  constructor(private readonly flightDetailsService: FlightDetailsService) {
    this.filterQueryBuilder = new FilterQueryBuilder<FlightDetailsDTO>();
  }

  @Get('list')
  async findAll() {
    return this.flightDetailsService.findAll({}, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.flightDetailsService.findOne({ _id: id }, { __v: 0 });
  }

  @Post('create')
  @ApiBody({
    description: 'Payload for creating a new Flight Details',
    type: FlightDetailsDTO,
  })
  async create(@Body() body: DeepPartial<FlightDetailsDTO>) {
    const { tailNo, ...rest } = body;
    const flightId = generateQuotationNumber(tailNo);
    return this.flightDetailsService.create({ flightId, tailNo, ...rest });
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the flight to update' })
  @ApiBody({
    description: 'Payload for updating an existing flight',
    type: FlightDetailsDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() body: Partial<FlightDetailsDTO>,
  ) {
    return this.flightDetailsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.flightDetailsService.delete(id);
  }

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
    const { results, total } = await this.flightDetailsService.query(
      filterQuery,
      options,
    );
    return { data: results, total };
  }
}
