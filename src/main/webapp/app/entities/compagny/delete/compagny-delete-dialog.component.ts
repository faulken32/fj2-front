import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompagny } from '../compagny.model';
import { CompagnyService } from '../service/compagny.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './compagny-delete-dialog.component.html',
})
export class CompagnyDeleteDialogComponent {
  compagny?: ICompagny;

  constructor(protected compagnyService: CompagnyService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.compagnyService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
