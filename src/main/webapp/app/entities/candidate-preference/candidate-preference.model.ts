import {IJobSubCat} from "../job-sub-cat/job-sub-cat.model";

export interface ICandidatePreference {
  id: number;
  distance?: number | null;
  jobSubCat?: IJobSubCat | null;
}

export type NewCandidatePreference = Omit<ICandidatePreference, 'id'> & { id: null };
