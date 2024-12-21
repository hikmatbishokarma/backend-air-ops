export abstract class BaseDTO {
  id!: string;

  createdAt?: Date;

  createdBy?: string;

  updatedAt?: Date;

  updatedBy?: string;

  deletedAt?: Date;

  deletedBy?: string;

  status: boolean;
}
