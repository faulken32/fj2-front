export interface IJobCat {
  id: number;
  name?: string | null;
  description?: string | null;
}

export type NewJobCat = Omit<IJobCat, 'id'> & { id: null };
