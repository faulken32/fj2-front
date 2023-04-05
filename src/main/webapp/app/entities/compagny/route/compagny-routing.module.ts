import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CompagnyComponent } from '../list/compagny.component';
import { CompagnyDetailComponent } from '../detail/compagny-detail.component';
import { CompagnyUpdateComponent } from '../update/compagny-update.component';
import { CompagnyRoutingResolveService } from './compagny-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const compagnyRoute: Routes = [
  {
    path: '',
    component: CompagnyComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CompagnyDetailComponent,
    resolve: {
      compagny: CompagnyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CompagnyUpdateComponent,
    resolve: {
      compagny: CompagnyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CompagnyUpdateComponent,
    resolve: {
      compagny: CompagnyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(compagnyRoute)],
  exports: [RouterModule],
})
export class CompagnyRoutingModule {}
