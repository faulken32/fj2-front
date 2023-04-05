import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CompagnyFormService, CompagnyFormGroup } from './compagny-form.service';
import { ICompagny } from '../compagny.model';
import { CompagnyService } from '../service/compagny.service';
import { IAddress } from 'app/entities/address/address.model';
import { AddressService } from 'app/entities/address/service/address.service';

@Component({
  selector: 'jhi-compagny-update',
  templateUrl: './compagny-update.component.html',
})
export class CompagnyUpdateComponent implements OnInit {
  isSaving = false;
  compagny: ICompagny | null = null;

  addressesCollection: IAddress[] = [];

  editForm: CompagnyFormGroup = this.compagnyFormService.createCompagnyFormGroup();

  constructor(
    protected compagnyService: CompagnyService,
    protected compagnyFormService: CompagnyFormService,
    protected addressService: AddressService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAddress = (o1: IAddress | null, o2: IAddress | null): boolean => this.addressService.compareAddress(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compagny }) => {
      this.compagny = compagny;
      if (compagny) {
        this.updateForm(compagny);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const compagny = this.compagnyFormService.getCompagny(this.editForm);
    if (compagny.id !== null) {
      this.subscribeToSaveResponse(this.compagnyService.update(compagny));
    } else {
      this.subscribeToSaveResponse(this.compagnyService.create(compagny));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompagny>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(compagny: ICompagny): void {
    this.compagny = compagny;
    this.compagnyFormService.resetForm(this.editForm, compagny);

    this.addressesCollection = this.addressService.addAddressToCollectionIfMissing<IAddress>(this.addressesCollection, compagny.address);
  }

  protected loadRelationshipsOptions(): void {
    this.addressService
      .query({ filter: 'compagny-is-null' })
      .pipe(map((res: HttpResponse<IAddress[]>) => res.body ?? []))
      .pipe(
        map((addresses: IAddress[]) => this.addressService.addAddressToCollectionIfMissing<IAddress>(addresses, this.compagny?.address))
      )
      .subscribe((addresses: IAddress[]) => (this.addressesCollection = addresses));
  }
}
