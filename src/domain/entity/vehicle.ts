export interface IVehicle {
  id?: string;
  createdAt?: Date;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  saleStatus?: SaleStatus;
  clientHolder?: string
  saledAt?: Date;
  updatedAt?: Date;
}

export enum SaleStatus {
  FOR_SALE = 'for_sale',
  SOLD = 'sold',
}

export function stringToSaleStatus(input: string): SaleStatus {
  const status = Object.values(SaleStatus).find(
    (status) => status.toLowerCase() === input.toLowerCase()
  );

  if (!status) {
    throw new Error(`Invalid SaleStatus: ${input}`);
  }

  return status;
}




