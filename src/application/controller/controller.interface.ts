import { IUseCase } from '@/usecase/usecase.interface';

export interface IController<T = void, Q = unknown> {
  useCase: IUseCase<Q>;

  handle(...args: unknown[]): Promise<T> | T;
}
