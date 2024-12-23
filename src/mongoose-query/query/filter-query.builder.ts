import { FilterQuery } from 'mongoose';
import { Filterable } from '../interfaces/filterable.interface';
import { Query } from '../interfaces/query.inteface';
import { SortDirection, SortField } from '../interfaces/sort-field.interface';
import { Filter } from '../interfaces/filter.interface';

const MONGOOSE_SORT_DIRECTION: Record<SortDirection, 1 | -1> = {
  [SortDirection.ASC]: 1,
  [SortDirection.DESC]: -1,
};

type MongooseSort = Record<string, 1 | -1>;

type MongooseQuery<Entity extends Document> = {
  filterQuery: FilterQuery<Entity>;
  options: { limit?: number; skip?: number; sort?: MongooseSort };
};

export class FilterQueryBuilder<DTO> {
  buildQuery({ filter, paging, sorting }: Query<DTO>) {
    return {
      filterQuery: this.buildFilterQuery(filter),
      options: {
        limit: paging?.limit,
        page: paging?.offset,
        sort: this.buildSorting(sorting),
      },
    };
  }

  buildSorting(sorts?: SortField<DTO>[]): MongooseSort | undefined {
    if (!sorts) {
      return undefined;
    }
    return sorts.reduce((sort: MongooseSort, sortField: SortField<DTO>) => {
      const field = sortField.field.toString();
      const direction = MONGOOSE_SORT_DIRECTION[sortField.direction];
      return { ...sort, [field]: direction };
    }, {});
  }

  // Handle filters (you can modify based on your application logic)
  buildFilterQuery(filter?: Filter<DTO>): Filterable<DTO> {
    if (!filter) {
      return {};
    }
    return {
      filter: filter || {},
    };
  }
}
