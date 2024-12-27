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

import { DeepPartial } from 'src/common/deep-partial.type';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PricesService } from './prices.service';
import { PricesDTO } from './dto/prices.dto';
import {
  FilterQueryBuilder,
  MONGOOSE_SORT_DIRECTION,
} from 'src/mongoose-query/query/filter-query.builder';
import { ListDTO } from 'src/common/dtos/list.dto';

@ApiTags('Prices')
@Controller('prices')
export class PricesController {
  private readonly filterQueryBuilder: FilterQueryBuilder<PricesDTO>;
  constructor(private readonly priceService: PricesService) {
    this.filterQueryBuilder = new FilterQueryBuilder<PricesDTO>();
  }

  @Get('list')
  async findAll() {
    return this.priceService.findAll({}, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.priceService.findOne({ _id: id }, { __v: 0 });
  }

  @Post('create')
  @ApiBody({
    description: 'Payload for creating a new Price',
    type: PricesDTO,
  })
  async create(@Body() body: DeepPartial<PricesDTO>) {
    return this.priceService.create(body);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the price to update' })
  @ApiBody({
    description: 'Payload for updating an existing price',
    type: PricesDTO,
  })
  async update(@Param('id') id: string, @Body() body: Partial<PricesDTO>) {
    return this.priceService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.priceService.delete(id);
  }

  @Post()
  async getList(@Body() query: ListDTO) {
    const { pagination, sort, filter } = query;

    // Build the filter query, defaulting to an empty object if no filter is provided
    const filterQuery = filter
      ? this.filterQueryBuilder.createMongoFilter<PricesDTO>(filter)
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
    const { results, total } = await this.priceService.query(
      filterQuery,
      options,
    );
    return { data: results, total };
  }
}
