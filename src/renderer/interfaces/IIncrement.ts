interface IIncrement {
  id: string;
  name: string;
  start?: string;
  end?: string;
  deadline?: string;
  state?: string;
  productId: string;
}

interface IIncrements {
  increments: IIncrement[];
  incrementsCount: number;
}

export type { IIncrements, IIncrement };
