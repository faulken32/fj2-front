import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IJobCat } from '../job-cat.model';
import { JobCatService } from '../service/job-cat.service';

@Injectable({ providedIn: 'root' })
export class JobCatRoutingResolveService implements Resolve<IJobCat | null> {
  constructor(protected service: JobCatService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobCat | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((jobCat: HttpResponse<IJobCat>) => {
          if (jobCat.body) {
            return of(jobCat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
