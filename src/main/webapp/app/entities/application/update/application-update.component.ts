import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ApplicationFormService, ApplicationFormGroup } from './application-form.service';
import { IApplication } from '../application.model';
import { ApplicationService } from '../service/application.service';
import { IJob } from 'app/entities/job/job.model';
import { JobService } from 'app/entities/job/service/job.service';
import { ICandidate } from 'app/entities/candidate/candidate.model';
import { CandidateService } from 'app/entities/candidate/service/candidate.service';
import { Status } from 'app/entities/enumerations/status.model';

@Component({
  selector: 'jhi-application-update',
  templateUrl: './application-update.component.html',
})
export class ApplicationUpdateComponent implements OnInit {
  isSaving = false;
  application: IApplication | null = null;
  statusValues = Object.keys(Status);

  jobsSharedCollection: IJob[] = [];
  candidatesSharedCollection: ICandidate[] = [];

  editForm: ApplicationFormGroup = this.applicationFormService.createApplicationFormGroup();

  constructor(
    protected applicationService: ApplicationService,
    protected applicationFormService: ApplicationFormService,
    protected jobService: JobService,
    protected candidateService: CandidateService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareJob = (o1: IJob | null, o2: IJob | null): boolean => this.jobService.compareJob(o1, o2);

  compareCandidate = (o1: ICandidate | null, o2: ICandidate | null): boolean => this.candidateService.compareCandidate(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ application }) => {
      this.application = application;
      if (application) {
        this.updateForm(application);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const application = this.applicationFormService.getApplication(this.editForm);
    if (application.id !== null) {
      this.subscribeToSaveResponse(this.applicationService.update(application));
    } else {
      this.subscribeToSaveResponse(this.applicationService.create(application));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplication>>): void {
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

  protected updateForm(application: IApplication): void {
    this.application = application;
    this.applicationFormService.resetForm(this.editForm, application);

    this.jobsSharedCollection = this.jobService.addJobToCollectionIfMissing<IJob>(this.jobsSharedCollection, application.job);
    this.candidatesSharedCollection = this.candidateService.addCandidateToCollectionIfMissing<ICandidate>(
      this.candidatesSharedCollection,
      application.candidate
    );
  }

  protected loadRelationshipsOptions(): void {
    this.jobService
      .query()
      .pipe(map((res: HttpResponse<IJob[]>) => res.body ?? []))
      .pipe(map((jobs: IJob[]) => this.jobService.addJobToCollectionIfMissing<IJob>(jobs, this.application?.job)))
      .subscribe((jobs: IJob[]) => (this.jobsSharedCollection = jobs));

    this.candidateService
      .query()
      .pipe(map((res: HttpResponse<ICandidate[]>) => res.body ?? []))
      .pipe(
        map((candidates: ICandidate[]) =>
          this.candidateService.addCandidateToCollectionIfMissing<ICandidate>(candidates, this.application?.candidate)
        )
      )
      .subscribe((candidates: ICandidate[]) => (this.candidatesSharedCollection = candidates));
  }
}
