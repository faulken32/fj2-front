import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CandidateFormService, CandidateFormGroup } from './candidate-form.service';
import { ICandidate } from '../candidate.model';
import { CandidateService } from '../service/candidate.service';
import { ICandidatePreference } from 'app/entities/candidate-preference/candidate-preference.model';
import { CandidatePreferenceService } from 'app/entities/candidate-preference/service/candidate-preference.service';
import { ICv } from 'app/entities/cv/cv.model';
import { CvService } from 'app/entities/cv/service/cv.service';

@Component({
  selector: 'jhi-candidate-update',
  templateUrl: './candidate-update.component.html',
})
export class CandidateUpdateComponent implements OnInit {
  isSaving = false;
  candidate: ICandidate | null = null;

  candidatePreferencesCollection: ICandidatePreference[] = [];
  cvsSharedCollection: ICv[] = [];

  editForm: CandidateFormGroup = this.candidateFormService.createCandidateFormGroup();

  constructor(
    protected candidateService: CandidateService,
    protected candidateFormService: CandidateFormService,
    protected candidatePreferenceService: CandidatePreferenceService,
    protected cvService: CvService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCandidatePreference = (o1: ICandidatePreference | null, o2: ICandidatePreference | null): boolean =>
    this.candidatePreferenceService.compareCandidatePreference(o1, o2);

  compareCv = (o1: ICv | null, o2: ICv | null): boolean => this.cvService.compareCv(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidate }) => {
      this.candidate = candidate;
      if (candidate) {
        this.updateForm(candidate);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const candidate = this.candidateFormService.getCandidate(this.editForm);
    if (candidate.id !== null) {
      this.subscribeToSaveResponse(this.candidateService.update(candidate));
    } else {
      this.subscribeToSaveResponse(this.candidateService.create(candidate));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidate>>): void {
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

  protected updateForm(candidate: ICandidate): void {
    this.candidate = candidate;
    this.candidateFormService.resetForm(this.editForm, candidate);

    this.candidatePreferencesCollection = this.candidatePreferenceService.addCandidatePreferenceToCollectionIfMissing<ICandidatePreference>(
      this.candidatePreferencesCollection,
      candidate.candidatePreference
    );
    this.cvsSharedCollection = this.cvService.addCvToCollectionIfMissing<ICv>(this.cvsSharedCollection, candidate.cv);
  }

  protected loadRelationshipsOptions(): void {
    this.candidatePreferenceService
      .query({ filter: 'candidate-is-null' })
      .pipe(map((res: HttpResponse<ICandidatePreference[]>) => res.body ?? []))
      .pipe(
        map((candidatePreferences: ICandidatePreference[]) =>
          this.candidatePreferenceService.addCandidatePreferenceToCollectionIfMissing<ICandidatePreference>(
            candidatePreferences,
            this.candidate?.candidatePreference
          )
        )
      )
      .subscribe((candidatePreferences: ICandidatePreference[]) => (this.candidatePreferencesCollection = candidatePreferences));

    this.cvService
      .query()
      .pipe(map((res: HttpResponse<ICv[]>) => res.body ?? []))
      .pipe(map((cvs: ICv[]) => this.cvService.addCvToCollectionIfMissing<ICv>(cvs, this.candidate?.cv)))
      .subscribe((cvs: ICv[]) => (this.cvsSharedCollection = cvs));
  }
}
