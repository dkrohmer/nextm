interface IResponsible {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface IResponsibles {
  responsibles: IResponsible[];
  responsiblesCount: number;
}

export type { IResponsibles, IResponsible };
