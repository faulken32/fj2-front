import dayjs from 'dayjs/esm';

import { IJob, NewJob } from './job.model';

export const sampleWithRequiredData: IJob = {
  id: 43395,
  name: 'Camp West',
  valid: false,
  validUntil: dayjs('2023-04-05T07:59'),
  salary: 2082,
};

export const sampleWithPartialData: IJob = {
  id: 4480,
  name: 'HTTP',
  valid: true,
  validUntil: dayjs('2023-04-04T19:02'),
  salary: 69405,
};

export const sampleWithFullData: IJob = {
  id: 57260,
  name: 'functionalities Fundamental',
  valid: false,
  validUntil: dayjs('2023-04-05T11:11'),
  salary: 47285,
  prime: 50187,
};

export const sampleWithNewData: NewJob = {
  name: 'deposit Account',
  valid: true,
  validUntil: dayjs('2023-04-04T19:05'),
  salary: 46242,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
