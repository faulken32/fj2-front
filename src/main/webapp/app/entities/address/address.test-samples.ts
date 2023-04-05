import { IAddress, NewAddress } from './address.model';

export const sampleWithRequiredData: IAddress = {
  id: 88754,
  street: 'Arjun Ridges',
  city: 'Lake Pattie',
  zipcode: 'Avon Central Assistant',
};

export const sampleWithPartialData: IAddress = {
  id: 34407,
  street: 'Maggio Locks',
  position: 'Montana',
  city: 'Jacksonville',
  zipcode: 'Cape Missouri',
};

export const sampleWithFullData: IAddress = {
  id: 25141,
  street: 'Paula Brooks',
  position: 'Focused Intelligent District',
  city: 'Cremintown',
  zipcode: 'viral Soap synthesizing',
};

export const sampleWithNewData: NewAddress = {
  street: 'Valentina Haven',
  city: 'Lake Candidahaven',
  zipcode: 'dynamic Birr experiences',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
