import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICv } from '../cv.model';
import { CvService } from '../service/cv.service';

@Injectable({ providedIn: 'root' })
export class CvRoutingResolveService implements Resolve<ICv | null> {
  constructor(protected service: CvService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICv | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cv: HttpResponse<ICv>) => {
          if (cv.body) {
            return of(cv.body);
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
