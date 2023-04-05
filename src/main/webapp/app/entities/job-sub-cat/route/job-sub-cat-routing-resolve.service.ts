import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IJobSubCat } from '../job-sub-cat.model';
import { JobSubCatService } from '../service/job-sub-cat.service';

@Injectable({ providedIn: 'root' })
export class JobSubCatRoutingResolveService implements Resolve<IJobSubCat | null> {
  constructor(protected service: JobSubCatService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobSubCat | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((jobSubCat: HttpResponse<IJobSubCat>) => {
          if (jobSubCat.body) {
            return of(jobSubCat.body);
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
