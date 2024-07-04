import { IVersion } from "./IVersion"

interface IModels {
  models: IModel[],
  modelsCount: number
}

interface IModel {
  id: string, 
  createdAt: string
  name: string, 
  incrementId: string,
  // versions?: IVersion[]
}

export type { IModels, IModel }