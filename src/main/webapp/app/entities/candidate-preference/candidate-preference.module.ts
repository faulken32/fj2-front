import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CandidatePreferenceComponent } from './list/candidate-preference.component';
import { CandidatePreferenceDetailComponent } from './detail/candidate-preference-detail.component';
import { CandidatePreferenceUpdateComponent } from './update/candidate-preference-update.component';
import { CandidatePreferenceDeleteDialogComponent } from './delete/candidate-preference-delete-dialog.component';
import { CandidatePreferenceRoutingModule } from './route/candidate-preference-routing.module';

@NgModule({
  imports: [SharedModule, CandidatePreferenceRoutingModule],
  declarations: [
    CandidatePreferenceComponent,
    CandidatePreferenceDetailComponent,
    CandidatePreferenceUpdateComponent,
    CandidatePreferenceDeleteDialogComponent,
  ],
})
export class CandidatePreferenceModule {}
