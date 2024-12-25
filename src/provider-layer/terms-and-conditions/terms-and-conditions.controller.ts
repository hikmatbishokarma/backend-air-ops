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

@ApiTags('Terms And Conditions')
@Controller('terms-and-conditions')
export class TermsAndConditionsController {
  constructor(
    private readonly termsAndConditionsService: TermsAndConditionsService,
  ) {}

  @Get()
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
}
