import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CandidateDisponibilityFormService, CandidateDisponibilityFormGroup } from './candidate-disponibility-form.service';
import { ICandidateDisponibility } from '../candidate-disponibility.model';
import { CandidateDisponibilityService } from '../service/candidate-disponibility.service';
import { ICandidate } from 'app/entities/candidate/candidate.model';
import { CandidateService } from 'app/entities/candidate/service/candidate.service';
import { TimeStatus } from 'app/entities/enumerations/time-status.model';

@Component({
  selector: 'jhi-candidate-disponibility-update',
  templateUrl: './candidate-disponibility-update.component.html',
})
export class CandidateDisponibilityUpdateComponent implements OnInit {
  isSaving = false;
  candidateDisponibility: ICandidateDisponibility | null = null;
  timeStatusValues = Object.keys(TimeStatus);

  candidatesSharedCollection: ICandidate[] = [];

  editForm: CandidateDisponibilityFormGroup = this.candidateDisponibilityFormService.createCandidateDisponibilityFormGroup();

  constructor(
    protected candidateDisponibilityService: CandidateDisponibilityService,
    protected candidateDisponibilityFormService: CandidateDisponibilityFormService,
    protected candidateService: CandidateService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCandidate = (o1: ICandidate | null, o2: ICandidate | null): boolean => this.candidateService.compareCandidate(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidateDisponibility }) => {
      this.candidateDisponibility = candidateDisponibility;
      if (candidateDisponibility) {
        this.updateForm(candidateDisponibility);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const candidateDisponibility = this.candidateDisponibilityFormService.getCandidateDisponibility(this.editForm);
    if (candidateDisponibility.id !== null) {
      this.subscribeToSaveResponse(this.candidateDisponibilityService.update(candidateDisponibility));
    } else {
      this.subscribeToSaveResponse(this.candidateDisponibilityService.create(candidateDisponibility));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidateDisponibility>>): void {
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

  protected updateForm(candidateDisponibility: ICandidateDisponibility): void {
    this.candidateDisponibility = candidateDisponibility;
    this.candidateDisponibilityFormService.resetForm(this.editForm, candidateDisponibility);

    this.candidatesSharedCollection = this.candidateService.addCandidateToCollectionIfMissing<ICandidate>(
      this.candidatesSharedCollection,
      candidateDisponibility.candidate
    );
  }

  protected loadRelationshipsOptions(): void {
    this.candidateService
      .query()
      .pipe(map((res: HttpResponse<ICandidate[]>) => res.body ?? []))
      .pipe(
        map((candidates: ICandidate[]) =>
          this.candidateService.addCandidateToCollectionIfMissing<ICandidate>(candidates, this.candidateDisponibility?.candidate)
        )
      )
      .subscribe((candidates: ICandidate[]) => (this.candidatesSharedCollection = candidates));
  }
}
