import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobCat } from '../job-cat.model';
import { JobCatService } from '../service/job-cat.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './job-cat-delete-dialog.component.html',
})
export class JobCatDeleteDialogComponent {
  jobCat?: IJobCat;

  constructor(protected jobCatService: JobCatService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobCatService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
