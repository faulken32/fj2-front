import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IJobCat, NewJobCat } from '../job-cat.model';

export type PartialUpdateJobCat = Partial<IJobCat> & Pick<IJobCat, 'id'>;

export type EntityResponseType = HttpResponse<IJobCat>;
export type EntityArrayResponseType = HttpResponse<IJobCat[]>;

@Injectable({ providedIn: 'root' })
export class JobCatService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/job-cats');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(jobCat: NewJobCat): Observable<EntityResponseType> {
    return this.http.post<IJobCat>(this.resourceUrl, jobCat, { observe: 'response' });
  }

  update(jobCat: IJobCat): Observable<EntityResponseType> {
    return this.http.put<IJobCat>(`${this.resourceUrl}/${this.getJobCatIdentifier(jobCat)}`, jobCat, { observe: 'response' });
  }

  partialUpdate(jobCat: PartialUpdateJobCat): Observable<EntityResponseType> {
    return this.http.patch<IJobCat>(`${this.resourceUrl}/${this.getJobCatIdentifier(jobCat)}`, jobCat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJobCat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobCat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getJobCatIdentifier(jobCat: Pick<IJobCat, 'id'>): number {
    return jobCat.id;
  }

  compareJobCat(o1: Pick<IJobCat, 'id'> | null, o2: Pick<IJobCat, 'id'> | null): boolean {
    return o1 && o2 ? this.getJobCatIdentifier(o1) === this.getJobCatIdentifier(o2) : o1 === o2;
  }

  addJobCatToCollectionIfMissing<Type extends Pick<IJobCat, 'id'>>(
    jobCatCollection: Type[],
    ...jobCatsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const jobCats: Type[] = jobCatsToCheck.filter(isPresent);
    if (jobCats.length > 0) {
      const jobCatCollectionIdentifiers = jobCatCollection.map(jobCatItem => this.getJobCatIdentifier(jobCatItem)!);
      const jobCatsToAdd = jobCats.filter(jobCatItem => {
        const jobCatIdentifier = this.getJobCatIdentifier(jobCatItem);
        if (jobCatCollectionIdentifiers.includes(jobCatIdentifier)) {
          return false;
        }
        jobCatCollectionIdentifiers.push(jobCatIdentifier);
        return true;
      });
      return [...jobCatsToAdd, ...jobCatCollection];
    }
    return jobCatCollection;
  }
}
