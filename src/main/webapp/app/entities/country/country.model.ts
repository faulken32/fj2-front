export interface ICountry {
  id: number;
  name?: string | null;
  code?: string | null;
}

export type NewCountry = Omit<ICountry, 'id'> & { id: null };
