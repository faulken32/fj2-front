import { ICountry, NewCountry } from './country.model';

export const sampleWithRequiredData: ICountry = {
  id: 4746,
  name: 'SCSI Configuration deposit',
  code: 'Tun',
};

export const sampleWithPartialData: ICountry = {
  id: 44167,
  name: 'engineer Computer',
  code: 'kno',
};

export const sampleWithFullData: ICountry = {
  id: 45927,
  name: 'Ringgit',
  code: 'Pro',
};

export const sampleWithNewData: NewCountry = {
  name: 'Open-architected Pre-emptive',
  code: 'fro',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
