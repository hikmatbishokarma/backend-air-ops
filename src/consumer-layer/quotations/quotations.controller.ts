import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { QuotationsService } from './quotations.service';
import { QuotationsDTO } from './dto/quotations.dto';
import { DeepPartial } from 'src/common/deep-partial.type';

@ApiTags('Quotation')
@Controller('quotations')
export class QuitationsController {
  constructor(private readonly quotationService: QuotationsService) {}

  @Get()
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
}
