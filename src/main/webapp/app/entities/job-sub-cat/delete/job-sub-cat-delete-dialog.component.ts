import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobSubCat } from '../job-sub-cat.model';
import { JobSubCatService } from '../service/job-sub-cat.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './job-sub-cat-delete-dialog.component.html',
})
export class JobSubCatDeleteDialogComponent {
  jobSubCat?: IJobSubCat;

  constructor(protected jobSubCatService: JobSubCatService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobSubCatService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
