export interface IUseCase<T = void> {
  execute(...args: unknown[]): T extends void ? void : Promise<T>;
}
