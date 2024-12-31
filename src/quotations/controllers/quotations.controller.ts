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
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DeepPartial } from 'src/common/deep-partial.type';
import {
  FilterQueryBuilder,
  MONGOOSE_SORT_DIRECTION,
} from 'src/mongoose-query/query/filter-query.builder';
import { ListDTO } from 'src/common/dtos/list.dto';
import {
  QuotationsDTO,
  UpdateQuotationStateDTO,
  UpgradeQuotationDTO,
} from '../dtos/quotations.dto';
import { QuotationsService } from '../services/quotations.service';
import { QuotationState } from 'src/app-constants/enums';

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

  @Get('preview')
  @ApiQuery({
    name: 'id',
    description: 'ID of the Quotation to preview',
    required: true,
  })
  async quotationPreview(@Query('id') id: string) {
    console.log('code', id);
    return this.quotationService.QuotationPreview(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.quotationService.findOne({ _id: id }, { __v: 0 });
  }

  @Post('create')
  @ApiBody({
    description: 'Payload for creating a Quotation',
    type: QuotationsDTO,
  })
  async createQuotation(@Body() body: DeepPartial<QuotationsDTO>) {
    return await this.quotationService.createQuotation(body);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID of the Quotation to update' })
  @ApiBody({
    description: 'Payload for updating an existing Quotation',
    type: QuotationsDTO,
  })
  async update(@Param('id') id: string, @Body() body: Partial<QuotationsDTO>) {
    return this.quotationService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.quotationService.delete(id);
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

  @Post('update-quotation-state')
  @ApiBody({
    description: 'Payload for updating state',
    type: UpdateQuotationStateDTO,
  })
  async updateQuotationState(@Body() body: UpdateQuotationStateDTO) {
    const { id, state } = body;
    return await this.quotationService.updateQuotationState(id, state);
  }
  @Post('upgrade-quotation')
  @ApiBody({
    description: 'Payload for upgrading quotation',
    type: UpgradeQuotationDTO, // Use the DTO class here
  })
  async upgrade(@Body() body: UpgradeQuotationDTO) {
    // Expecting an object with `code` field
    const { code } = body; // Extract the code from the body
    return await this.quotationService.upgrade(code);
  }
}
