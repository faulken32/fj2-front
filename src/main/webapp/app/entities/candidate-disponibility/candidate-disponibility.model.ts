import dayjs from 'dayjs/esm';
import { ICandidate } from 'app/entities/candidate/candidate.model';
import { TimeStatus } from 'app/entities/enumerations/time-status.model';

export interface ICandidateDisponibility {
  id: number;
  dipoTime?: dayjs.Dayjs | null;
  dispoPeriod?: TimeStatus | null;
  candidate?: Pick<ICandidate, 'id'> | null;
}

export type NewCandidateDisponibility = Omit<ICandidateDisponibility, 'id'> & { id: null };
