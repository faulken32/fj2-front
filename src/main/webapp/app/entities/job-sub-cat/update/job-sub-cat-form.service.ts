import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IJobSubCat, NewJobSubCat } from '../job-sub-cat.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IJobSubCat for edit and NewJobSubCatFormGroupInput for create.
 */
type JobSubCatFormGroupInput = IJobSubCat | PartialWithRequiredKeyOf<NewJobSubCat>;

type JobSubCatFormDefaults = Pick<NewJobSubCat, 'id'>;

type JobSubCatFormGroupContent = {
  id: FormControl<IJobSubCat['id'] | NewJobSubCat['id']>;
  name: FormControl<IJobSubCat['name']>;
  description: FormControl<IJobSubCat['description']>;
  jobCat: FormControl<IJobSubCat['jobCat']>;
  candidatePreference: FormControl<IJobSubCat['candidatePreference']>;
};

export type JobSubCatFormGroup = FormGroup<JobSubCatFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class JobSubCatFormService {
  createJobSubCatFormGroup(jobSubCat: JobSubCatFormGroupInput = { id: null }): JobSubCatFormGroup {
    const jobSubCatRawValue = {
      ...this.getFormDefaults(),
      ...jobSubCat,
    };
    return new FormGroup<JobSubCatFormGroupContent>({
      id: new FormControl(
        { value: jobSubCatRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(jobSubCatRawValue.name, {
        validators: [Validators.required],
      }),
      description: new FormControl(jobSubCatRawValue.description, {
        validators: [Validators.required],
      }),
      jobCat: new FormControl(jobSubCatRawValue.jobCat),
      candidatePreference: new FormControl(jobSubCatRawValue.candidatePreference),
    });
  }

  getJobSubCat(form: JobSubCatFormGroup): IJobSubCat | NewJobSubCat {
    return form.getRawValue() as IJobSubCat | NewJobSubCat;
  }

  resetForm(form: JobSubCatFormGroup, jobSubCat: JobSubCatFormGroupInput): void {
    const jobSubCatRawValue = { ...this.getFormDefaults(), ...jobSubCat };
    form.reset(
      {
        ...jobSubCatRawValue,
        id: { value: jobSubCatRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): JobSubCatFormDefaults {
    return {
      id: null,
    };
  }
}
