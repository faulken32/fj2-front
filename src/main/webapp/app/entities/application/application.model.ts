import dayjs from 'dayjs/esm';
import { IJob } from 'app/entities/job/job.model';
import { ICandidate } from 'app/entities/candidate/candidate.model';
import { Status } from 'app/entities/enumerations/status.model';

export interface IApplication {
  id: number;
  date?: dayjs.Dayjs | null;
  status?: Status | null;
  job?: Pick<IJob, 'id' | 'name'> | null;
  candidate?: Pick<ICandidate, 'id'> | null;
}

export type NewApplication = Omit<IApplication, 'id'> & { id: null };
