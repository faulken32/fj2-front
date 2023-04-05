import dayjs from 'dayjs/esm';

import { ICandidate, NewCandidate } from './candidate.model';

export const sampleWithRequiredData: ICandidate = {
  id: 59103,
  name: 'Planner hack',
  phone: '1-538-558-5574 x01083',
};

export const sampleWithPartialData: ICandidate = {
  id: 5762,
  userId: 72824,
  name: 'Clothing Car National',
  phone: '(472) 989-1911',
};

export const sampleWithFullData: ICandidate = {
  id: 80167,
  userId: 35611,
  name: 'Honduras olive Awesome',
  phone: '882.342.3359 x727',
  valid: true,
  validUntil: dayjs('2023-04-04T14:18'),
};

export const sampleWithNewData: NewCandidate = {
  name: 'radical',
  phone: '456-966-5530 x48587',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
