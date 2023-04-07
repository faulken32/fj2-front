import dayjs from 'dayjs/esm';

import { ICv, NewCv } from './cv.model';

export const sampleWithRequiredData: ICv = {
  id: 16631,
  name: 'Human Configuration impactful',
};

export const sampleWithPartialData: ICv = {
  id: 75706,
  name: 'Robust Fundamental methodologies',
  format: 'deploy ivory',
};

export const sampleWithFullData: ICv = {
  id: 55243,
  name: 'Markets indexing wireless',
  updateDate: dayjs('2023-04-05T10:05'),
  format: 'Frozen withdrawal hacking',
};

export const sampleWithNewData: NewCv = {
  name: 'regional XML',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
