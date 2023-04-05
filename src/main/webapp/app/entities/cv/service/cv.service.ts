import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICv, NewCv } from '../cv.model';

export type PartialUpdateCv = Partial<ICv> & Pick<ICv, 'id'>;

type RestOf<T extends ICv | NewCv> = Omit<T, 'updateDate'> & {
  updateDate?: string | null;
};

export type RestCv = RestOf<ICv>;

export type NewRestCv = RestOf<NewCv>;

export type PartialUpdateRestCv = RestOf<PartialUpdateCv>;

export type EntityResponseType = HttpResponse<ICv>;
export type EntityArrayResponseType = HttpResponse<ICv[]>;

@Injectable({ providedIn: 'root' })
export class CvService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cvs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cv: NewCv): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cv);
    return this.http.post<RestCv>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cv: ICv): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cv);
    return this.http
      .put<RestCv>(`${this.resourceUrl}/${this.getCvIdentifier(cv)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cv: PartialUpdateCv): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cv);
    return this.http
      .patch<RestCv>(`${this.resourceUrl}/${this.getCvIdentifier(cv)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCv>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCv[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCvIdentifier(cv: Pick<ICv, 'id'>): number {
    return cv.id;
  }

  compareCv(o1: Pick<ICv, 'id'> | null, o2: Pick<ICv, 'id'> | null): boolean {
    return o1 && o2 ? this.getCvIdentifier(o1) === this.getCvIdentifier(o2) : o1 === o2;
  }

  addCvToCollectionIfMissing<Type extends Pick<ICv, 'id'>>(cvCollection: Type[], ...cvsToCheck: (Type | null | undefined)[]): Type[] {
    const cvs: Type[] = cvsToCheck.filter(isPresent);
    if (cvs.length > 0) {
      const cvCollectionIdentifiers = cvCollection.map(cvItem => this.getCvIdentifier(cvItem)!);
      const cvsToAdd = cvs.filter(cvItem => {
        const cvIdentifier = this.getCvIdentifier(cvItem);
        if (cvCollectionIdentifiers.includes(cvIdentifier)) {
          return false;
        }
        cvCollectionIdentifiers.push(cvIdentifier);
        return true;
      });
      return [...cvsToAdd, ...cvCollection];
    }
    return cvCollection;
  }

  protected convertDateFromClient<T extends ICv | NewCv | PartialUpdateCv>(cv: T): RestOf<T> {
    return {
      ...cv,
      updateDate: cv.updateDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCv: RestCv): ICv {
    return {
      ...restCv,
      updateDate: restCv.updateDate ? dayjs(restCv.updateDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCv>): HttpResponse<ICv> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCv[]>): HttpResponse<ICv[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
