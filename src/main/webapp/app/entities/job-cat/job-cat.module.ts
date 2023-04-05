import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { JobCatComponent } from './list/job-cat.component';
import { JobCatDetailComponent } from './detail/job-cat-detail.component';
import { JobCatUpdateComponent } from './update/job-cat-update.component';
import { JobCatDeleteDialogComponent } from './delete/job-cat-delete-dialog.component';
import { JobCatRoutingModule } from './route/job-cat-routing.module';

@NgModule({
  imports: [SharedModule, JobCatRoutingModule],
  declarations: [JobCatComponent, JobCatDetailComponent, JobCatUpdateComponent, JobCatDeleteDialogComponent],
})
export class JobCatModule {}
