import { IResponsible } from './IResponsible';

interface IProduct {
  id: string;
  name: string;
  createdAt: string;
  description?: string;
  startsAt?: string;
  endsAt?: string;
  responsibles?: IResponsible[];
  // increments?: IIncrement[],
  latestIncrementId?: string;
}

interface IProducts {
  products: IProduct[];
  productsCount: number;
}

export type { IProducts, IProduct };
