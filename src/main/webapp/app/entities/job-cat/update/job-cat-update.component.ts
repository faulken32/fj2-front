import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { JobCatFormService, JobCatFormGroup } from './job-cat-form.service';
import { IJobCat } from '../job-cat.model';
import { JobCatService } from '../service/job-cat.service';

@Component({
  selector: 'jhi-job-cat-update',
  templateUrl: './job-cat-update.component.html',
})
export class JobCatUpdateComponent implements OnInit {
  isSaving = false;
  jobCat: IJobCat | null = null;

  editForm: JobCatFormGroup = this.jobCatFormService.createJobCatFormGroup();

  constructor(
    protected jobCatService: JobCatService,
    protected jobCatFormService: JobCatFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobCat }) => {
      this.jobCat = jobCat;
      if (jobCat) {
        this.updateForm(jobCat);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobCat = this.jobCatFormService.getJobCat(this.editForm);
    if (jobCat.id !== null) {
      this.subscribeToSaveResponse(this.jobCatService.update(jobCat));
    } else {
      this.subscribeToSaveResponse(this.jobCatService.create(jobCat));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobCat>>): void {
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

  protected updateForm(jobCat: IJobCat): void {
    this.jobCat = jobCat;
    this.jobCatFormService.resetForm(this.editForm, jobCat);
  }
}
