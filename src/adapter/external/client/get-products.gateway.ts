// import axios from 'axios';
// import { IGateway } from '../gateway.interface';
// import { IProductRef } from '@/domain/entity/product';

// export class GetProductsGateway implements IGateway<string[], IProductRef[]> {
//   async handle(...ids: string[]): Promise<IProductRef[]> {
//     return (
//       await Promise.all(
//         ids.map((id) => axios.get<{ data: IProductRef }>(`http://app-svc-inventory/product/${id}`)),
//       )
//     ).map((response) => response.data.data);
//   }
// }
