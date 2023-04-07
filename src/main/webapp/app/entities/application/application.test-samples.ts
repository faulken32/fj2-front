import dayjs from 'dayjs/esm';

import { Status } from 'app/entities/enumerations/status.model';

import { IApplication, NewApplication } from './application.model';

export const sampleWithRequiredData: IApplication = {
  id: 99506,
};

export const sampleWithPartialData: IApplication = {
  id: 6690,
};

export const sampleWithFullData: IApplication = {
  id: 17599,
  date: dayjs('2023-04-05T07:57'),
  status: Status['PENDING'],
};

export const sampleWithNewData: NewApplication = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
