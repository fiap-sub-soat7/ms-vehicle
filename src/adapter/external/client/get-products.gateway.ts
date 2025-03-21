import axios from 'axios';
import { IGateway } from '../gateway.interface';
import { IClientRef } from '@/domain/entity/client';

export class GetClientGateway implements IGateway<string, IClientRef> {
  async handle(id: string): Promise<IClientRef> {
    return (await axios.get<{ data: IClientRef }>(`http://app-svc-client/${id}`)).data.data;
  }
}
