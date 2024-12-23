/**
 * A comparison for fields in T using MongoDB-like operators.
 * @typeparam T - the type of object to filter on.
 */
export type FilterComparisons<T> = {
  [K in keyof T]?: FilterFieldComparison<T[K]>;
};

/**
 * A grouping of filters that should be ANDed or ORed together.
 */
type FilterGrouping<T> = {
  /**
   * Group an array of filters with an AND operation.
   */
  $and?: Filter<T>[];
  /**
   * Group an array of filters with an OR operation.
   */
  $or?: Filter<T>[];
};

/**
 * Filter for type T using MongoDB-like operators.
 * @typeparam T - the type of object to filter on.
 */
export type Filter<T> = FilterGrouping<T> & FilterComparisons<T>;

/**
 * Field comparison operators customized to MongoDB style.
 */
export type FilterFieldComparison<T> = {
  /**
   * Equal to (`$eq`).
   */
  $eq?: T;
  /**
   * Not equal to (`$ne`).
   */
  $ne?: T;
  /**
   * Greater than (`$gt`).
   */
  $gt?: T;
  /**
   * Greater than or equal to (`$gte`).
   */
  $gte?: T;
  /**
   * Less than (`$lt`).
   */
  $lt?: T;
  /**
   * Less than or equal to (`$lte`).
   */
  $lte?: T;
  /**
   * In array (`$in`).
   */
  $in?: T[];
  /**
   * Not in array (`$nin`).
   */
  $nin?: T[];
  /**
   * Matches a regular expression (`$regex`).
   */
  $regex?: string;
  /**
   * Matches null (`$exists`).
   */
  $exists?: boolean;
};
