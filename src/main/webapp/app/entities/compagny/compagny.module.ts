import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CompagnyComponent } from './list/compagny.component';
import { CompagnyDetailComponent } from './detail/compagny-detail.component';
import { CompagnyUpdateComponent } from './update/compagny-update.component';
import { CompagnyDeleteDialogComponent } from './delete/compagny-delete-dialog.component';
import { CompagnyRoutingModule } from './route/compagny-routing.module';

@NgModule({
  imports: [SharedModule, CompagnyRoutingModule],
  declarations: [CompagnyComponent, CompagnyDetailComponent, CompagnyUpdateComponent, CompagnyDeleteDialogComponent],
})
export class CompagnyModule {}
