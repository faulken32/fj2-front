import dayjs from 'dayjs/esm';

import { TimeStatus } from 'app/entities/enumerations/time-status.model';

import { ICandidateDisponibility, NewCandidateDisponibility } from './candidate-disponibility.model';

export const sampleWithRequiredData: ICandidateDisponibility = {
  id: 97542,
  dipoTime: dayjs('2023-04-05T08:44'),
  dispoPeriod: TimeStatus['MORNING'],
};

export const sampleWithPartialData: ICandidateDisponibility = {
  id: 26891,
  dipoTime: dayjs('2023-04-05T11:00'),
  dispoPeriod: TimeStatus['MORNING'],
};

export const sampleWithFullData: ICandidateDisponibility = {
  id: 38817,
  dipoTime: dayjs('2023-04-05T04:31'),
  dispoPeriod: TimeStatus['NIGHT'],
};

export const sampleWithNewData: NewCandidateDisponibility = {
  dipoTime: dayjs('2023-04-04T19:59'),
  dispoPeriod: TimeStatus['MORNING'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
