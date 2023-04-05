import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CvFormService, CvFormGroup } from './cv-form.service';
import { ICv } from '../cv.model';
import { CvService } from '../service/cv.service';

@Component({
  selector: 'jhi-cv-update',
  templateUrl: './cv-update.component.html',
})
export class CvUpdateComponent implements OnInit {
  isSaving = false;
  cv: ICv | null = null;

  editForm: CvFormGroup = this.cvFormService.createCvFormGroup();

  constructor(protected cvService: CvService, protected cvFormService: CvFormService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cv }) => {
      this.cv = cv;
      if (cv) {
        this.updateForm(cv);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cv = this.cvFormService.getCv(this.editForm);
    if (cv.id !== null) {
      this.subscribeToSaveResponse(this.cvService.update(cv));
    } else {
      this.subscribeToSaveResponse(this.cvService.create(cv));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICv>>): void {
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

  protected updateForm(cv: ICv): void {
    this.cv = cv;
    this.cvFormService.resetForm(this.editForm, cv);
  }
}
