interface IResponsibles {
  responsibles: IResponsible[],
  responsiblesCount: number 
}

interface IResponsible {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export type { IResponsibles, IResponsible }