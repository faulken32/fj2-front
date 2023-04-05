import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CandidatePreferenceComponent } from '../list/candidate-preference.component';
import { CandidatePreferenceDetailComponent } from '../detail/candidate-preference-detail.component';
import { CandidatePreferenceUpdateComponent } from '../update/candidate-preference-update.component';
import { CandidatePreferenceRoutingResolveService } from './candidate-preference-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const candidatePreferenceRoute: Routes = [
  {
    path: '',
    component: CandidatePreferenceComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CandidatePreferenceDetailComponent,
    resolve: {
      candidatePreference: CandidatePreferenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CandidatePreferenceUpdateComponent,
    resolve: {
      candidatePreference: CandidatePreferenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CandidatePreferenceUpdateComponent,
    resolve: {
      candidatePreference: CandidatePreferenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(candidatePreferenceRoute)],
  exports: [RouterModule],
})
export class CandidatePreferenceRoutingModule {}
