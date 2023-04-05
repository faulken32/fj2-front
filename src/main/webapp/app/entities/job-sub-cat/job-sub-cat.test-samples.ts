import { IJobSubCat, NewJobSubCat } from './job-sub-cat.model';

export const sampleWithRequiredData: IJobSubCat = {
  id: 53142,
  name: 'USB management Zloty',
  description: 'Granite Cheese',
};

export const sampleWithPartialData: IJobSubCat = {
  id: 44055,
  name: 'Loan Handcrafted',
  description: 'Rubber compressing Rubber',
};

export const sampleWithFullData: IJobSubCat = {
  id: 6782,
  name: 'brand',
  description: 'bypassing capacity bypassing',
};

export const sampleWithNewData: NewJobSubCat = {
  name: 'contingency',
  description: 'District COM Greenland',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
