import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { JobSubCatComponent } from './list/job-sub-cat.component';
import { JobSubCatDetailComponent } from './detail/job-sub-cat-detail.component';
import { JobSubCatUpdateComponent } from './update/job-sub-cat-update.component';
import { JobSubCatDeleteDialogComponent } from './delete/job-sub-cat-delete-dialog.component';
import { JobSubCatRoutingModule } from './route/job-sub-cat-routing.module';

@NgModule({
  imports: [SharedModule, JobSubCatRoutingModule],
  declarations: [JobSubCatComponent, JobSubCatDetailComponent, JobSubCatUpdateComponent, JobSubCatDeleteDialogComponent],
})
export class JobSubCatModule {}
