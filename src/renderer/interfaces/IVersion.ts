interface IVersion {
  id: string;
  createdAt: string;
  payload: Record<string, any>; // todo change this
  thumbnail: string;
  x: number;
  y: number;
  height: number;
  width: number;
}

interface IVersions {
  versions: IVersion[];
  versionsCount: number;
}

export type { IVersion, IVersions };
