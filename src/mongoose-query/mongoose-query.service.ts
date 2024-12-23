import { Injectable } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  Model as MongooseModel,
  ProjectionType,
} from 'mongoose';
import { DeepPartial } from 'src/common/deep-partial.type';

@Injectable()
export class MongooseQueryService<Entity extends Document> {
  constructor(private readonly Model: MongooseModel<Entity>) {}

  async create(createDto: DeepPartial<Entity>): Promise<Entity> {
    const createdEntity = new this.Model(createDto);
    return createdEntity.save();
  }

  async findAll(
    filter: FilterQuery<Entity> = {},
    projection?: ProjectionType<Entity>, // Add optional projection parameter
  ): Promise<Entity[]> {
    return this.Model.find(filter, projection).exec();
  }

  async findOne(
    filter: FilterQuery<Entity>,
    projection?: ProjectionType<Entity>,
  ): Promise<Entity | null> {
    return this.Model.findOne(filter, projection).exec();
  }

  async findById(
    id: string,
    projection?: ProjectionType<Entity>, // Add optional projection parameter
  ): Promise<Entity | null> {
    return this.Model.findById(id, projection).exec();
  }
  async update(
    id: string,
    updateDto: DeepPartial<Entity>,
  ): Promise<Entity | null> {
    return this.Model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Entity | null> {
    return this.Model.findByIdAndDelete(id).exec();
  }

  async query(
    filter: FilterQuery<Entity> = {},
    options: { page: number; limit: number; sort?: Record<string, 1 | -1> },
    projection?: ProjectionType<Entity>, // Optional projection parameter
  ): Promise<Entity[]> {
    const { page, limit, sort } = options;
    return this.Model.find(filter, projection) // Apply projection
      .sort(sort || {}) // Apply sorting
      .skip((page - 1) * limit) // Apply pagination
      .limit(limit) // Limit results
      .exec();
  }
}
