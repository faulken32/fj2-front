import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { JobSubCatFormService, JobSubCatFormGroup } from './job-sub-cat-form.service';
import { IJobSubCat } from '../job-sub-cat.model';
import { JobSubCatService } from '../service/job-sub-cat.service';
import { IJobCat } from 'app/entities/job-cat/job-cat.model';
import { JobCatService } from 'app/entities/job-cat/service/job-cat.service';
import { ICandidatePreference } from 'app/entities/candidate-preference/candidate-preference.model';
import { CandidatePreferenceService } from 'app/entities/candidate-preference/service/candidate-preference.service';

@Component({
  selector: 'jhi-job-sub-cat-update',
  templateUrl: './job-sub-cat-update.component.html',
})
export class JobSubCatUpdateComponent implements OnInit {
  isSaving = false;
  jobSubCat: IJobSubCat | null = null;

  jobCatsSharedCollection: IJobCat[] = [];
  candidatePreferencesSharedCollection: ICandidatePreference[] = [];

  editForm: JobSubCatFormGroup = this.jobSubCatFormService.createJobSubCatFormGroup();

  constructor(
    protected jobSubCatService: JobSubCatService,
    protected jobSubCatFormService: JobSubCatFormService,
    protected jobCatService: JobCatService,
    protected candidatePreferenceService: CandidatePreferenceService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareJobCat = (o1: IJobCat | null, o2: IJobCat | null): boolean => this.jobCatService.compareJobCat(o1, o2);

  compareCandidatePreference = (o1: ICandidatePreference | null, o2: ICandidatePreference | null): boolean =>
    this.candidatePreferenceService.compareCandidatePreference(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobSubCat }) => {
      this.jobSubCat = jobSubCat;
      if (jobSubCat) {
        this.updateForm(jobSubCat);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobSubCat = this.jobSubCatFormService.getJobSubCat(this.editForm);
    if (jobSubCat.id !== null) {
      this.subscribeToSaveResponse(this.jobSubCatService.update(jobSubCat));
    } else {
      this.subscribeToSaveResponse(this.jobSubCatService.create(jobSubCat));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobSubCat>>): void {
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

  protected updateForm(jobSubCat: IJobSubCat): void {
    this.jobSubCat = jobSubCat;
    this.jobSubCatFormService.resetForm(this.editForm, jobSubCat);

    this.jobCatsSharedCollection = this.jobCatService.addJobCatToCollectionIfMissing<IJobCat>(
      this.jobCatsSharedCollection,
      jobSubCat.jobCat
    );
    this.candidatePreferencesSharedCollection =
      this.candidatePreferenceService.addCandidatePreferenceToCollectionIfMissing<ICandidatePreference>(
        this.candidatePreferencesSharedCollection,
        jobSubCat.candidatePreference
      );
  }

  protected loadRelationshipsOptions(): void {
    this.jobCatService
      .query()
      .pipe(map((res: HttpResponse<IJobCat[]>) => res.body ?? []))
      .pipe(map((jobCats: IJobCat[]) => this.jobCatService.addJobCatToCollectionIfMissing<IJobCat>(jobCats, this.jobSubCat?.jobCat)))
      .subscribe((jobCats: IJobCat[]) => (this.jobCatsSharedCollection = jobCats));

    this.candidatePreferenceService
      .query()
      .pipe(map((res: HttpResponse<ICandidatePreference[]>) => res.body ?? []))
      .pipe(
        map((candidatePreferences: ICandidatePreference[]) =>
          this.candidatePreferenceService.addCandidatePreferenceToCollectionIfMissing<ICandidatePreference>(
            candidatePreferences,
            this.jobSubCat?.candidatePreference
          )
        )
      )
      .subscribe((candidatePreferences: ICandidatePreference[]) => (this.candidatePreferencesSharedCollection = candidatePreferences));
  }
}
