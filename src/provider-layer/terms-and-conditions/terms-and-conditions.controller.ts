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
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { TermsAndConditionsDTO } from './dto/terms-and-coonditions.dto';
import { ListDTO } from 'src/common/dtos/list.dto';
import {
  FilterQueryBuilder,
  MONGOOSE_SORT_DIRECTION,
} from 'src/mongoose-query/query/filter-query.builder';

@ApiTags('Terms And Conditions')
@Controller('terms-and-conditions')
export class TermsAndConditionsController {
  private readonly filterQueryBuilder: FilterQueryBuilder<TermsAndConditionsDTO>;
  constructor(
    private readonly termsAndConditionsService: TermsAndConditionsService,
  ) {
    this.filterQueryBuilder = new FilterQueryBuilder<TermsAndConditionsDTO>();
  }

  @Get('list')
  async findAll() {
    return this.termsAndConditionsService.findAll({}, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.termsAndConditionsService.findOne({ _id: id }, { __v: 0 });
  }

  @Post('create')
  @ApiBody({
    description: 'Payload for creating a new Terms And Conditions',
    type: TermsAndConditionsDTO,
  })
  async create(@Body() body: DeepPartial<TermsAndConditionsDTO>) {
    return this.termsAndConditionsService.create(body);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'ID of the terms and conditions to update',
  })
  @ApiBody({
    description: 'Payload for updating an existing terms and conditions',
    type: TermsAndConditionsDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() body: Partial<TermsAndConditionsDTO>,
  ) {
    return this.termsAndConditionsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.termsAndConditionsService.delete(id);
  }

  @Post()
  async getList(@Body() query: ListDTO) {
    const { pagination, sort, filter } = query;

    // Build the filter query, defaulting to an empty object if no filter is provided
    const filterQuery = filter
      ? this.filterQueryBuilder.createMongoFilter<TermsAndConditionsDTO>(filter)
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
    const { results, total } = await this.termsAndConditionsService.query(
      filterQuery,
      options,
    );
    return { data: results, total };
  }
}
