import { IContact, NewContact } from './contact.model';

export const sampleWithRequiredData: IContact = {
  id: 36482,
  name: 'online',
  phone: '(279) 889-5808',
  email: 'Elody_Hermann27@gmail.com',
};

export const sampleWithPartialData: IContact = {
  id: 48835,
  name: 'navigate Supervisor Granite',
  phone: '924.690.5798',
  email: 'Bernard34@hotmail.com',
};

export const sampleWithFullData: IContact = {
  id: 20183,
  name: 'Account invoice Ruble',
  phone: '456-943-8075 x96294',
  email: 'Ward31@hotmail.com',
};

export const sampleWithNewData: NewContact = {
  name: 'Glen',
  phone: '659.746.3486 x039',
  email: 'Blaise_Schimmel@gmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
