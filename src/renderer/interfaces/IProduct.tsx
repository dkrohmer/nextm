import { IIncrement } from './IIncrement';
import './IResponsible'

import { IResponsible } from './IResponsible';

interface IProducts {
  products: IProduct[],
  productsCount: number
}

interface IProduct {
  id: string;
  name: string;
  createdAt: string;
  description?: string;
  startsAt?: string;
  endsAt?: string;
  responsibles?: IResponsible[],
  // increments?: IIncrement[],
  latestIncrementId?: string
}

export type { IProducts, IProduct };