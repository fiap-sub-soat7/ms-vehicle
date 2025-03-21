import { Model } from 'mongoose';

export type IModel<T> = Model<T>;

export abstract class RepositoryBase<T> {
  readonly model: IModel<T>;

  constructor(model?: IModel<T>) {
    this.model = model;
  }
}
