import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CvComponent } from './list/cv.component';
import { CvDetailComponent } from './detail/cv-detail.component';
import { CvUpdateComponent } from './update/cv-update.component';
import { CvDeleteDialogComponent } from './delete/cv-delete-dialog.component';
import { CvRoutingModule } from './route/cv-routing.module';

@NgModule({
  imports: [SharedModule, CvRoutingModule],
  declarations: [CvComponent, CvDetailComponent, CvUpdateComponent, CvDeleteDialogComponent],
})
export class CvModule {}
