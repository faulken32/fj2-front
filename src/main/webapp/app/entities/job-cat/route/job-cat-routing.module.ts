import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { JobCatComponent } from '../list/job-cat.component';
import { JobCatDetailComponent } from '../detail/job-cat-detail.component';
import { JobCatUpdateComponent } from '../update/job-cat-update.component';
import { JobCatRoutingResolveService } from './job-cat-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const jobCatRoute: Routes = [
  {
    path: '',
    component: JobCatComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JobCatDetailComponent,
    resolve: {
      jobCat: JobCatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JobCatUpdateComponent,
    resolve: {
      jobCat: JobCatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JobCatUpdateComponent,
    resolve: {
      jobCat: JobCatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(jobCatRoute)],
  exports: [RouterModule],
})
export class JobCatRoutingModule {}
