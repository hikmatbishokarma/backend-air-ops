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

@ApiTags('Prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly priceService: PricesService) {}

  @Get()
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
}
