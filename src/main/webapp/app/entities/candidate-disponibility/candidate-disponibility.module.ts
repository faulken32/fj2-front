import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CandidateDisponibilityComponent } from './list/candidate-disponibility.component';
import { CandidateDisponibilityDetailComponent } from './detail/candidate-disponibility-detail.component';
import { CandidateDisponibilityUpdateComponent } from './update/candidate-disponibility-update.component';
import { CandidateDisponibilityDeleteDialogComponent } from './delete/candidate-disponibility-delete-dialog.component';
import { CandidateDisponibilityRoutingModule } from './route/candidate-disponibility-routing.module';

@NgModule({
  imports: [SharedModule, CandidateDisponibilityRoutingModule],
  declarations: [
    CandidateDisponibilityComponent,
    CandidateDisponibilityDetailComponent,
    CandidateDisponibilityUpdateComponent,
    CandidateDisponibilityDeleteDialogComponent,
  ],
})
export class CandidateDisponibilityModule {}
