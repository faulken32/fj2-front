import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IJobSubCat, NewJobSubCat } from '../job-sub-cat.model';

export type PartialUpdateJobSubCat = Partial<IJobSubCat> & Pick<IJobSubCat, 'id'>;

export type EntityResponseType = HttpResponse<IJobSubCat>;
export type EntityArrayResponseType = HttpResponse<IJobSubCat[]>;

@Injectable({ providedIn: 'root' })
export class JobSubCatService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/job-sub-cats');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(jobSubCat: NewJobSubCat): Observable<EntityResponseType> {
    return this.http.post<IJobSubCat>(this.resourceUrl, jobSubCat, { observe: 'response' });
  }

  update(jobSubCat: IJobSubCat): Observable<EntityResponseType> {
    return this.http.put<IJobSubCat>(`${this.resourceUrl}/${this.getJobSubCatIdentifier(jobSubCat)}`, jobSubCat, { observe: 'response' });
  }

  partialUpdate(jobSubCat: PartialUpdateJobSubCat): Observable<EntityResponseType> {
    return this.http.patch<IJobSubCat>(`${this.resourceUrl}/${this.getJobSubCatIdentifier(jobSubCat)}`, jobSubCat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJobSubCat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobSubCat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getJobSubCatIdentifier(jobSubCat: Pick<IJobSubCat, 'id'>): number {
    return jobSubCat.id;
  }

  compareJobSubCat(o1: Pick<IJobSubCat, 'id'> | null, o2: Pick<IJobSubCat, 'id'> | null): boolean {
    return o1 && o2 ? this.getJobSubCatIdentifier(o1) === this.getJobSubCatIdentifier(o2) : o1 === o2;
  }

  addJobSubCatToCollectionIfMissing<Type extends Pick<IJobSubCat, 'id'>>(
    jobSubCatCollection: Type[],
    ...jobSubCatsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const jobSubCats: Type[] = jobSubCatsToCheck.filter(isPresent);
    if (jobSubCats.length > 0) {
      const jobSubCatCollectionIdentifiers = jobSubCatCollection.map(jobSubCatItem => this.getJobSubCatIdentifier(jobSubCatItem)!);
      const jobSubCatsToAdd = jobSubCats.filter(jobSubCatItem => {
        const jobSubCatIdentifier = this.getJobSubCatIdentifier(jobSubCatItem);
        if (jobSubCatCollectionIdentifiers.includes(jobSubCatIdentifier)) {
          return false;
        }
        jobSubCatCollectionIdentifiers.push(jobSubCatIdentifier);
        return true;
      });
      return [...jobSubCatsToAdd, ...jobSubCatCollection];
    }
    return jobSubCatCollection;
  }
}
