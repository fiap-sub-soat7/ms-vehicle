import { ClassConstructor, plainToInstance } from 'class-transformer';

export const instanceToDTO = <T, J, R = J extends Array<unknown> ? T[] : T>(
  plain: J,
  cls: ClassConstructor<T>,
): R =>
  plainToInstance<unknown, unknown>(cls, plain, {
    excludeExtraneousValues: true,
  }) as R;
