import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICandidateDisponibility } from '../candidate-disponibility.model';
import { CandidateDisponibilityService } from '../service/candidate-disponibility.service';

@Injectable({ providedIn: 'root' })
export class CandidateDisponibilityRoutingResolveService implements Resolve<ICandidateDisponibility | null> {
  constructor(protected service: CandidateDisponibilityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICandidateDisponibility | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((candidateDisponibility: HttpResponse<ICandidateDisponibility>) => {
          if (candidateDisponibility.body) {
            return of(candidateDisponibility.body);
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
