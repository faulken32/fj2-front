import { IJobCat, NewJobCat } from './job-cat.model';

export const sampleWithRequiredData: IJobCat = {
  id: 32376,
  name: 'web-enabled Future-proofed',
  description: 'Garden Plastic',
};

export const sampleWithPartialData: IJobCat = {
  id: 7218,
  name: 'Configuration',
  description: '24/7',
};

export const sampleWithFullData: IJobCat = {
  id: 50615,
  name: 'Automotive matrix superstructure',
  description: 'Infrastructure',
};

export const sampleWithNewData: NewJobCat = {
  name: 'one-to-one blue',
  description: 'Implementation Djibouti',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
