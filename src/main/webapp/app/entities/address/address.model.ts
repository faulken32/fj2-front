import { ICountry } from 'app/entities/country/country.model';

export interface IAddress {
  id: number;
  street?: string | null;
  position?: string | null;
  city?: string | null;
  zipcode?: string | null;
  country?: Pick<ICountry, 'id'> | null;
}

export type NewAddress = Omit<IAddress, 'id'> & { id: null };
