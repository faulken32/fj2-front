export interface ICandidatePreference {
  id: number;
  distance?: number | null;
}

export type NewCandidatePreference = Omit<ICandidatePreference, 'id'> & { id: null };
