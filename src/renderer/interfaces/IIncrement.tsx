import { IModel } from "./IModel"
import { IVersion } from "./IVersion"

interface IIncrements {
  increments: IIncrement[],
  incrementsCount: number
}

interface IIncrement {
  id: string, 
  name: string, 
  start?: string,
  end?: string,
  deadline?: string,
  state?: string,
  productId: string,
  // models: IModel []
}

export type { IIncrements, IIncrement }