import dayjs from 'dayjs/esm';
import { ICandidatePreference } from 'app/entities/candidate-preference/candidate-preference.model';
import { ICv } from 'app/entities/cv/cv.model';

export interface ICandidate {
  id: number;
  userId?: number | null;
  name?: string | null;
  phone?: string | null;
  valid?: boolean | null;
  validUntil?: dayjs.Dayjs | null;
  candidatePreference?: Pick<ICandidatePreference, 'id'> | null;
  cv?: Pick<ICv, 'id' | 'name'> | null;
}

export type NewCandidate = Omit<ICandidate, 'id'> & { id: null };
