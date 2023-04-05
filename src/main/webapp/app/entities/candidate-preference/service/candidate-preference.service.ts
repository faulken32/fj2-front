import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICandidatePreference, NewCandidatePreference } from '../candidate-preference.model';

export type PartialUpdateCandidatePreference = Partial<ICandidatePreference> & Pick<ICandidatePreference, 'id'>;

export type EntityResponseType = HttpResponse<ICandidatePreference>;
export type EntityArrayResponseType = HttpResponse<ICandidatePreference[]>;

@Injectable({ providedIn: 'root' })
export class CandidatePreferenceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/candidate-preferences');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(candidatePreference: NewCandidatePreference): Observable<EntityResponseType> {
    return this.http.post<ICandidatePreference>(this.resourceUrl, candidatePreference, { observe: 'response' });
  }

  update(candidatePreference: ICandidatePreference): Observable<EntityResponseType> {
    return this.http.put<ICandidatePreference>(
      `${this.resourceUrl}/${this.getCandidatePreferenceIdentifier(candidatePreference)}`,
      candidatePreference,
      { observe: 'response' }
    );
  }

  partialUpdate(candidatePreference: PartialUpdateCandidatePreference): Observable<EntityResponseType> {
    return this.http.patch<ICandidatePreference>(
      `${this.resourceUrl}/${this.getCandidatePreferenceIdentifier(candidatePreference)}`,
      candidatePreference,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICandidatePreference>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandidatePreference[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCandidatePreferenceIdentifier(candidatePreference: Pick<ICandidatePreference, 'id'>): number {
    return candidatePreference.id;
  }

  compareCandidatePreference(o1: Pick<ICandidatePreference, 'id'> | null, o2: Pick<ICandidatePreference, 'id'> | null): boolean {
    return o1 && o2 ? this.getCandidatePreferenceIdentifier(o1) === this.getCandidatePreferenceIdentifier(o2) : o1 === o2;
  }

  addCandidatePreferenceToCollectionIfMissing<Type extends Pick<ICandidatePreference, 'id'>>(
    candidatePreferenceCollection: Type[],
    ...candidatePreferencesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const candidatePreferences: Type[] = candidatePreferencesToCheck.filter(isPresent);
    if (candidatePreferences.length > 0) {
      const candidatePreferenceCollectionIdentifiers = candidatePreferenceCollection.map(
        candidatePreferenceItem => this.getCandidatePreferenceIdentifier(candidatePreferenceItem)!
      );
      const candidatePreferencesToAdd = candidatePreferences.filter(candidatePreferenceItem => {
        const candidatePreferenceIdentifier = this.getCandidatePreferenceIdentifier(candidatePreferenceItem);
        if (candidatePreferenceCollectionIdentifiers.includes(candidatePreferenceIdentifier)) {
          return false;
        }
        candidatePreferenceCollectionIdentifiers.push(candidatePreferenceIdentifier);
        return true;
      });
      return [...candidatePreferencesToAdd, ...candidatePreferenceCollection];
    }
    return candidatePreferenceCollection;
  }
}
