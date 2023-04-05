import dayjs from 'dayjs/esm';
import { IAddress } from 'app/entities/address/address.model';
import { IContact } from 'app/entities/contact/contact.model';
import { IJobSubCat } from 'app/entities/job-sub-cat/job-sub-cat.model';
import { ICandidate } from 'app/entities/candidate/candidate.model';
import { ICompagny } from 'app/entities/compagny/compagny.model';

export interface IJob {
  id: number;
  name?: string | null;
  valid?: boolean | null;
  validUntil?: dayjs.Dayjs | null;
  salary?: number | null;
  prime?: number | null;
  address?: Pick<IAddress, 'id'> | null;
  contact?: Pick<IContact, 'id'> | null;
  jobSubCat?: Pick<IJobSubCat, 'id'> | null;
  candidate?: Pick<ICandidate, 'id'> | null;
  compagny?: Pick<ICompagny, 'id'> | null;
}

export type NewJob = Omit<IJob, 'id'> & { id: null };
