import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { JobFormService, JobFormGroup } from './job-form.service';
import { IJob } from '../job.model';
import { JobService } from '../service/job.service';
import { IAddress } from 'app/entities/address/address.model';
import { AddressService } from 'app/entities/address/service/address.service';
import { IContact } from 'app/entities/contact/contact.model';
import { ContactService } from 'app/entities/contact/service/contact.service';
import { IJobSubCat } from 'app/entities/job-sub-cat/job-sub-cat.model';
import { JobSubCatService } from 'app/entities/job-sub-cat/service/job-sub-cat.service';
import { ICandidate } from 'app/entities/candidate/candidate.model';
import { CandidateService } from 'app/entities/candidate/service/candidate.service';
import { ICompagny } from 'app/entities/compagny/compagny.model';
import { CompagnyService } from 'app/entities/compagny/service/compagny.service';

@Component({
  selector: 'jhi-job-update',
  templateUrl: './job-update.component.html',
})
export class JobUpdateComponent implements OnInit {
  isSaving = false;
  job: IJob | null = null;

  addressesCollection: IAddress[] = [];
  contactsCollection: IContact[] = [];
  jobSubCatsSharedCollection: IJobSubCat[] = [];
  candidatesSharedCollection: ICandidate[] = [];
  compagniesSharedCollection: ICompagny[] = [];

  editForm: JobFormGroup = this.jobFormService.createJobFormGroup();

  constructor(
    protected jobService: JobService,
    protected jobFormService: JobFormService,
    protected addressService: AddressService,
    protected contactService: ContactService,
    protected jobSubCatService: JobSubCatService,
    protected candidateService: CandidateService,
    protected compagnyService: CompagnyService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAddress = (o1: IAddress | null, o2: IAddress | null): boolean => this.addressService.compareAddress(o1, o2);

  compareContact = (o1: IContact | null, o2: IContact | null): boolean => this.contactService.compareContact(o1, o2);

  compareJobSubCat = (o1: IJobSubCat | null, o2: IJobSubCat | null): boolean => this.jobSubCatService.compareJobSubCat(o1, o2);

  compareCandidate = (o1: ICandidate | null, o2: ICandidate | null): boolean => this.candidateService.compareCandidate(o1, o2);

  compareCompagny = (o1: ICompagny | null, o2: ICompagny | null): boolean => this.compagnyService.compareCompagny(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.job = job;
      if (job) {
        this.updateForm(job);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const job = this.jobFormService.getJob(this.editForm);
    if (job.id !== null) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJob>>): void {
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

  protected updateForm(job: IJob): void {
    this.job = job;
    this.jobFormService.resetForm(this.editForm, job);

    this.addressesCollection = this.addressService.addAddressToCollectionIfMissing<IAddress>(this.addressesCollection, job.address);
    this.contactsCollection = this.contactService.addContactToCollectionIfMissing<IContact>(this.contactsCollection, job.contact);
    this.jobSubCatsSharedCollection = this.jobSubCatService.addJobSubCatToCollectionIfMissing<IJobSubCat>(
      this.jobSubCatsSharedCollection,
      job.jobSubCat
    );
    this.candidatesSharedCollection = this.candidateService.addCandidateToCollectionIfMissing<ICandidate>(
      this.candidatesSharedCollection,
      job.candidate
    );
    this.compagniesSharedCollection = this.compagnyService.addCompagnyToCollectionIfMissing<ICompagny>(
      this.compagniesSharedCollection,
      job.compagny
    );
  }

  protected loadRelationshipsOptions(): void {
    this.addressService
      .query({ filter: 'job-is-null' })
      .pipe(map((res: HttpResponse<IAddress[]>) => res.body ?? []))
      .pipe(map((addresses: IAddress[]) => this.addressService.addAddressToCollectionIfMissing<IAddress>(addresses, this.job?.address)))
      .subscribe((addresses: IAddress[]) => (this.addressesCollection = addresses));

    this.contactService
      .query({ filter: 'job-is-null' })
      .pipe(map((res: HttpResponse<IContact[]>) => res.body ?? []))
      .pipe(map((contacts: IContact[]) => this.contactService.addContactToCollectionIfMissing<IContact>(contacts, this.job?.contact)))
      .subscribe((contacts: IContact[]) => (this.contactsCollection = contacts));

    this.jobSubCatService
      .query()
      .pipe(map((res: HttpResponse<IJobSubCat[]>) => res.body ?? []))
      .pipe(
        map((jobSubCats: IJobSubCat[]) =>
          this.jobSubCatService.addJobSubCatToCollectionIfMissing<IJobSubCat>(jobSubCats, this.job?.jobSubCat)
        )
      )
      .subscribe((jobSubCats: IJobSubCat[]) => (this.jobSubCatsSharedCollection = jobSubCats));

    this.candidateService
      .query()
      .pipe(map((res: HttpResponse<ICandidate[]>) => res.body ?? []))
      .pipe(
        map((candidates: ICandidate[]) =>
          this.candidateService.addCandidateToCollectionIfMissing<ICandidate>(candidates, this.job?.candidate)
        )
      )
      .subscribe((candidates: ICandidate[]) => (this.candidatesSharedCollection = candidates));

    this.compagnyService
      .query()
      .pipe(map((res: HttpResponse<ICompagny[]>) => res.body ?? []))
      .pipe(
        map((compagnies: ICompagny[]) => this.compagnyService.addCompagnyToCollectionIfMissing<ICompagny>(compagnies, this.job?.compagny))
      )
      .subscribe((compagnies: ICompagny[]) => (this.compagniesSharedCollection = compagnies));
  }
}
