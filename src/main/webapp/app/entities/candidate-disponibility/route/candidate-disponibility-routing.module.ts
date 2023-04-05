import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CandidateDisponibilityComponent } from '../list/candidate-disponibility.component';
import { CandidateDisponibilityDetailComponent } from '../detail/candidate-disponibility-detail.component';
import { CandidateDisponibilityUpdateComponent } from '../update/candidate-disponibility-update.component';
import { CandidateDisponibilityRoutingResolveService } from './candidate-disponibility-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const candidateDisponibilityRoute: Routes = [
  {
    path: '',
    component: CandidateDisponibilityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CandidateDisponibilityDetailComponent,
    resolve: {
      candidateDisponibility: CandidateDisponibilityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CandidateDisponibilityUpdateComponent,
    resolve: {
      candidateDisponibility: CandidateDisponibilityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CandidateDisponibilityUpdateComponent,
    resolve: {
      candidateDisponibility: CandidateDisponibilityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(candidateDisponibilityRoute)],
  exports: [RouterModule],
})
export class CandidateDisponibilityRoutingModule {}
