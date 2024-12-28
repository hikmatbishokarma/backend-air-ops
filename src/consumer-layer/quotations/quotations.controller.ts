import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { QuotationsService } from './quotations.service';
import { QuotationsDTO } from './dto/quotations.dto';
import { DeepPartial } from 'src/common/deep-partial.type';
import {
  FilterQueryBuilder,
  MONGOOSE_SORT_DIRECTION,
} from 'src/mongoose-query/query/filter-query.builder';
import { ListDTO } from 'src/common/dtos/list.dto';

@ApiTags('Quotation')
@Controller('quotations')
export class QuitationsController {
  private readonly filterQueryBuilder: FilterQueryBuilder<QuotationsDTO>;
  constructor(private readonly quotationService: QuotationsService) {
    this.filterQueryBuilder = new FilterQueryBuilder<QuotationsDTO>();
  }

  @Get('list')
  async getQuotation() {
    return await this.quotationService.Quotations();
  }

  @Post('create')
  @ApiBody({
    description: 'Payload for creating a Quotation',
    type: QuotationsDTO,
  })
  async createQuotation(@Body() body: DeepPartial<QuotationsDTO>) {
    return await this.quotationService.createQuotation(body);
  }

  @Post()
  async getList(@Body() query: ListDTO) {
    const { pagination, sort, filter } = query;

    // Build the filter query, defaulting to an empty object if no filter is provided
    const filterQuery = filter
      ? this.filterQueryBuilder.createMongoFilter<QuotationsDTO>(filter)
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
    const { results, total } = await this.quotationService.query(
      filterQuery,
      options,
    );
    return { data: results, total };
  }
}
