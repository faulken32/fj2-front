export interface IContact {
  id: number;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
}

export type NewContact = Omit<IContact, 'id'> & { id: null };
