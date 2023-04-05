import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CandidatePreferenceFormService, CandidatePreferenceFormGroup } from './candidate-preference-form.service';
import { ICandidatePreference } from '../candidate-preference.model';
import { CandidatePreferenceService } from '../service/candidate-preference.service';

@Component({
  selector: 'jhi-candidate-preference-update',
  templateUrl: './candidate-preference-update.component.html',
})
export class CandidatePreferenceUpdateComponent implements OnInit {
  isSaving = false;
  candidatePreference: ICandidatePreference | null = null;

  editForm: CandidatePreferenceFormGroup = this.candidatePreferenceFormService.createCandidatePreferenceFormGroup();

  constructor(
    protected candidatePreferenceService: CandidatePreferenceService,
    protected candidatePreferenceFormService: CandidatePreferenceFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidatePreference }) => {
      this.candidatePreference = candidatePreference;
      if (candidatePreference) {
        this.updateForm(candidatePreference);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const candidatePreference = this.candidatePreferenceFormService.getCandidatePreference(this.editForm);
    if (candidatePreference.id !== null) {
      this.subscribeToSaveResponse(this.candidatePreferenceService.update(candidatePreference));
    } else {
      this.subscribeToSaveResponse(this.candidatePreferenceService.create(candidatePreference));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidatePreference>>): void {
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

  protected updateForm(candidatePreference: ICandidatePreference): void {
    this.candidatePreference = candidatePreference;
    this.candidatePreferenceFormService.resetForm(this.editForm, candidatePreference);
  }
}
