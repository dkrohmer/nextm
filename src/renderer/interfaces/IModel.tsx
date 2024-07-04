interface IModel {
  id: string;
  createdAt: string;
  name: string;
  incrementId: string;
  // versions?: IVersion[]
}

interface IModels {
  models: IModel[];
  modelsCount: number;
}

export type { IModels, IModel };
