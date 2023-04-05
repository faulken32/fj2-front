import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CvComponent } from '../list/cv.component';
import { CvDetailComponent } from '../detail/cv-detail.component';
import { CvUpdateComponent } from '../update/cv-update.component';
import { CvRoutingResolveService } from './cv-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const cvRoute: Routes = [
  {
    path: '',
    component: CvComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CvDetailComponent,
    resolve: {
      cv: CvRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CvUpdateComponent,
    resolve: {
      cv: CvRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CvUpdateComponent,
    resolve: {
      cv: CvRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cvRoute)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
