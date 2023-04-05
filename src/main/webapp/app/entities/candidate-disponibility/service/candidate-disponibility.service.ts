import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICandidateDisponibility, NewCandidateDisponibility } from '../candidate-disponibility.model';

export type PartialUpdateCandidateDisponibility = Partial<ICandidateDisponibility> & Pick<ICandidateDisponibility, 'id'>;

type RestOf<T extends ICandidateDisponibility | NewCandidateDisponibility> = Omit<T, 'dipoTime'> & {
  dipoTime?: string | null;
};

export type RestCandidateDisponibility = RestOf<ICandidateDisponibility>;

export type NewRestCandidateDisponibility = RestOf<NewCandidateDisponibility>;

export type PartialUpdateRestCandidateDisponibility = RestOf<PartialUpdateCandidateDisponibility>;

export type EntityResponseType = HttpResponse<ICandidateDisponibility>;
export type EntityArrayResponseType = HttpResponse<ICandidateDisponibility[]>;

@Injectable({ providedIn: 'root' })
export class CandidateDisponibilityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/candidate-disponibilities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(candidateDisponibility: NewCandidateDisponibility): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(candidateDisponibility);
    return this.http
      .post<RestCandidateDisponibility>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(candidateDisponibility: ICandidateDisponibility): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(candidateDisponibility);
    return this.http
      .put<RestCandidateDisponibility>(`${this.resourceUrl}/${this.getCandidateDisponibilityIdentifier(candidateDisponibility)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(candidateDisponibility: PartialUpdateCandidateDisponibility): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(candidateDisponibility);
    return this.http
      .patch<RestCandidateDisponibility>(`${this.resourceUrl}/${this.getCandidateDisponibilityIdentifier(candidateDisponibility)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCandidateDisponibility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCandidateDisponibility[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCandidateDisponibilityIdentifier(candidateDisponibility: Pick<ICandidateDisponibility, 'id'>): number {
    return candidateDisponibility.id;
  }

  compareCandidateDisponibility(o1: Pick<ICandidateDisponibility, 'id'> | null, o2: Pick<ICandidateDisponibility, 'id'> | null): boolean {
    return o1 && o2 ? this.getCandidateDisponibilityIdentifier(o1) === this.getCandidateDisponibilityIdentifier(o2) : o1 === o2;
  }

  addCandidateDisponibilityToCollectionIfMissing<Type extends Pick<ICandidateDisponibility, 'id'>>(
    candidateDisponibilityCollection: Type[],
    ...candidateDisponibilitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const candidateDisponibilities: Type[] = candidateDisponibilitiesToCheck.filter(isPresent);
    if (candidateDisponibilities.length > 0) {
      const candidateDisponibilityCollectionIdentifiers = candidateDisponibilityCollection.map(
        candidateDisponibilityItem => this.getCandidateDisponibilityIdentifier(candidateDisponibilityItem)!
      );
      const candidateDisponibilitiesToAdd = candidateDisponibilities.filter(candidateDisponibilityItem => {
        const candidateDisponibilityIdentifier = this.getCandidateDisponibilityIdentifier(candidateDisponibilityItem);
        if (candidateDisponibilityCollectionIdentifiers.includes(candidateDisponibilityIdentifier)) {
          return false;
        }
        candidateDisponibilityCollectionIdentifiers.push(candidateDisponibilityIdentifier);
        return true;
      });
      return [...candidateDisponibilitiesToAdd, ...candidateDisponibilityCollection];
    }
    return candidateDisponibilityCollection;
  }

  protected convertDateFromClient<T extends ICandidateDisponibility | NewCandidateDisponibility | PartialUpdateCandidateDisponibility>(
    candidateDisponibility: T
  ): RestOf<T> {
    return {
      ...candidateDisponibility,
      dipoTime: candidateDisponibility.dipoTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCandidateDisponibility: RestCandidateDisponibility): ICandidateDisponibility {
    return {
      ...restCandidateDisponibility,
      dipoTime: restCandidateDisponibility.dipoTime ? dayjs(restCandidateDisponibility.dipoTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCandidateDisponibility>): HttpResponse<ICandidateDisponibility> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCandidateDisponibility[]>): HttpResponse<ICandidateDisponibility[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
