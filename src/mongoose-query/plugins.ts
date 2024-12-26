import { Schema } from 'mongoose';

export const toJsonTransformPlugin = (schema: Schema) => {
  schema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id; // Map `_id` to `id`
      delete ret._id; // Remove `_id`
      delete ret.__v; // Optional: Remove `__v`
    },
  });
};
