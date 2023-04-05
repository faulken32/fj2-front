import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICandidatePreference } from '../candidate-preference.model';
import { CandidatePreferenceService } from '../service/candidate-preference.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './candidate-preference-delete-dialog.component.html',
})
export class CandidatePreferenceDeleteDialogComponent {
  candidatePreference?: ICandidatePreference;

  constructor(protected candidatePreferenceService: CandidatePreferenceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.candidatePreferenceService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
