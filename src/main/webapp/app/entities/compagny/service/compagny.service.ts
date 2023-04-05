import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICompagny, NewCompagny } from '../compagny.model';

export type PartialUpdateCompagny = Partial<ICompagny> & Pick<ICompagny, 'id'>;

export type EntityResponseType = HttpResponse<ICompagny>;
export type EntityArrayResponseType = HttpResponse<ICompagny[]>;

@Injectable({ providedIn: 'root' })
export class CompagnyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/compagnies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(compagny: NewCompagny): Observable<EntityResponseType> {
    return this.http.post<ICompagny>(this.resourceUrl, compagny, { observe: 'response' });
  }

  update(compagny: ICompagny): Observable<EntityResponseType> {
    return this.http.put<ICompagny>(`${this.resourceUrl}/${this.getCompagnyIdentifier(compagny)}`, compagny, { observe: 'response' });
  }

  partialUpdate(compagny: PartialUpdateCompagny): Observable<EntityResponseType> {
    return this.http.patch<ICompagny>(`${this.resourceUrl}/${this.getCompagnyIdentifier(compagny)}`, compagny, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompagny>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompagny[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCompagnyIdentifier(compagny: Pick<ICompagny, 'id'>): number {
    return compagny.id;
  }

  compareCompagny(o1: Pick<ICompagny, 'id'> | null, o2: Pick<ICompagny, 'id'> | null): boolean {
    return o1 && o2 ? this.getCompagnyIdentifier(o1) === this.getCompagnyIdentifier(o2) : o1 === o2;
  }

  addCompagnyToCollectionIfMissing<Type extends Pick<ICompagny, 'id'>>(
    compagnyCollection: Type[],
    ...compagniesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const compagnies: Type[] = compagniesToCheck.filter(isPresent);
    if (compagnies.length > 0) {
      const compagnyCollectionIdentifiers = compagnyCollection.map(compagnyItem => this.getCompagnyIdentifier(compagnyItem)!);
      const compagniesToAdd = compagnies.filter(compagnyItem => {
        const compagnyIdentifier = this.getCompagnyIdentifier(compagnyItem);
        if (compagnyCollectionIdentifiers.includes(compagnyIdentifier)) {
          return false;
        }
        compagnyCollectionIdentifiers.push(compagnyIdentifier);
        return true;
      });
      return [...compagniesToAdd, ...compagnyCollection];
    }
    return compagnyCollection;
  }
}
