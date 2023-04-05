import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICandidateDisponibility } from '../candidate-disponibility.model';
import { CandidateDisponibilityService } from '../service/candidate-disponibility.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './candidate-disponibility-delete-dialog.component.html',
})
export class CandidateDisponibilityDeleteDialogComponent {
  candidateDisponibility?: ICandidateDisponibility;

  constructor(protected candidateDisponibilityService: CandidateDisponibilityService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.candidateDisponibilityService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
