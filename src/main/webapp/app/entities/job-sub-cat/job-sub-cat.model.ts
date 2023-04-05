import { IJobCat } from 'app/entities/job-cat/job-cat.model';
import { ICandidatePreference } from 'app/entities/candidate-preference/candidate-preference.model';

export interface IJobSubCat {
  id: number;
  name?: string | null;
  description?: string | null;
  jobCat?: Pick<IJobCat, 'id'> | null;
  candidatePreference?: Pick<ICandidatePreference, 'id'> | null;
}

export type NewJobSubCat = Omit<IJobSubCat, 'id'> & { id: null };
