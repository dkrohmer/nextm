import { IResponsible } from './IResponsible';

interface IProduct {
  id: string;
  name: string;
  createdAt: string;
  description?: string;
  startsAt?: string | null;
  endsAt?: string | null;
  responsibles?: IResponsible[];
  latestIncrementId?: string;
}

interface IProducts {
  products: IProduct[];
  productsCount: number;
}

export type { IProducts, IProduct };
