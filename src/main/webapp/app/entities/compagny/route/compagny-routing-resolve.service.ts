import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICompagny } from '../compagny.model';
import { CompagnyService } from '../service/compagny.service';

@Injectable({ providedIn: 'root' })
export class CompagnyRoutingResolveService implements Resolve<ICompagny | null> {
  constructor(protected service: CompagnyService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICompagny | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((compagny: HttpResponse<ICompagny>) => {
          if (compagny.body) {
            return of(compagny.body);
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
