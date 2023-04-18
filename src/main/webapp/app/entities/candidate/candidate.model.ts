import dayjs from 'dayjs/esm';
import { ICandidatePreference } from 'app/entities/candidate-preference/candidate-preference.model';
import { ICv } from 'app/entities/cv/cv.model';
import { IUser } from '../user/user.model';
import { IAddress } from '../address/address.model';

export interface ICandidate {
  id: number;
  user?: IUser | null;
  userId?: number | null;
  address?: IAddress | null;
  name?: string | null;
  phone?: string | null;
  valid?: boolean | null;
  validUntil?: dayjs.Dayjs | null;
  candidatePreference?: Pick<ICandidatePreference, 'id' | 'distance'> | null;
  cv?: Pick<ICv, 'id' | 'name'> | null;
}

export type NewCandidate = Omit<ICandidate, 'id'> & { id: null };
