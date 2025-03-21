export interface IGateway<T, R> {
  handle(...data: T extends Array<unknown> ? T : [T]): Promise<R> | R;
}
