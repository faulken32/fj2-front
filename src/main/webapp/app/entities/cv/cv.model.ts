import dayjs from 'dayjs/esm';

export interface ICv {
  id: number;
  name?: string | null;
  updateDate?: dayjs.Dayjs | null;
  format?: string | null;
}

export type NewCv = Omit<ICv, 'id'> & { id: null };
