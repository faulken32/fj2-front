import { ICandidatePreference, NewCandidatePreference } from './candidate-preference.model';

export const sampleWithRequiredData: ICandidatePreference = {
  id: 5017,
};

export const sampleWithPartialData: ICandidatePreference = {
  id: 96110,
};

export const sampleWithFullData: ICandidatePreference = {
  id: 77951,
  distance: 67,
};

export const sampleWithNewData: NewCandidatePreference = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
