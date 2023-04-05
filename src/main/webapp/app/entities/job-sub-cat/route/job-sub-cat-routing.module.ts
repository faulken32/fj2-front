import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { JobSubCatComponent } from '../list/job-sub-cat.component';
import { JobSubCatDetailComponent } from '../detail/job-sub-cat-detail.component';
import { JobSubCatUpdateComponent } from '../update/job-sub-cat-update.component';
import { JobSubCatRoutingResolveService } from './job-sub-cat-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const jobSubCatRoute: Routes = [
  {
    path: '',
    component: JobSubCatComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JobSubCatDetailComponent,
    resolve: {
      jobSubCat: JobSubCatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JobSubCatUpdateComponent,
    resolve: {
      jobSubCat: JobSubCatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JobSubCatUpdateComponent,
    resolve: {
      jobSubCat: JobSubCatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(jobSubCatRoute)],
  exports: [RouterModule],
})
export class JobSubCatRoutingModule {}
