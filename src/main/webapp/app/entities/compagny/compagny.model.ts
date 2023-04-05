import { IAddress } from 'app/entities/address/address.model';

export interface ICompagny {
  id: number;
  name?: string | null;
  description?: string | null;
  phone?: string | null;
  logoUrl?: string | null;
  address?: Pick<IAddress, 'id'> | null;
}

export type NewCompagny = Omit<ICompagny, 'id'> & { id: null };
