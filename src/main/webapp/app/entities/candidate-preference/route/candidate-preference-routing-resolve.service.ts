import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICandidatePreference } from '../candidate-preference.model';
import { CandidatePreferenceService } from '../service/candidate-preference.service';

@Injectable({ providedIn: 'root' })
export class CandidatePreferenceRoutingResolveService implements Resolve<ICandidatePreference | null> {
  constructor(protected service: CandidatePreferenceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICandidatePreference | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((candidatePreference: HttpResponse<ICandidatePreference>) => {
          if (candidatePreference.body) {
            return of(candidatePreference.body);
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
