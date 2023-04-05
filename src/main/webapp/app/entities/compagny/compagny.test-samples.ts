import { ICompagny, NewCompagny } from './compagny.model';

export const sampleWithRequiredData: ICompagny = {
  id: 20673,
  name: 'open-source Idaho best-of-breed',
  description: 'Developer PCI',
  phone: '(868) 776-1345',
};

export const sampleWithPartialData: ICompagny = {
  id: 49450,
  name: 'metrics',
  description: 'Gloves',
  phone: '564.715.4017 x1442',
};

export const sampleWithFullData: ICompagny = {
  id: 50915,
  name: 'invoice PCI Phased',
  description: 'Home Global payment',
  phone: '1-209-937-0706 x463',
  logoUrl: 'Crescent Carolina Georgia',
};

export const sampleWithNewData: NewCompagny = {
  name: 'Money hack SMS',
  description: 'global local',
  phone: '621-991-2687 x25944',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
