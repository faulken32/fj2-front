import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IJobCat, NewJobCat } from '../job-cat.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IJobCat for edit and NewJobCatFormGroupInput for create.
 */
type JobCatFormGroupInput = IJobCat | PartialWithRequiredKeyOf<NewJobCat>;

type JobCatFormDefaults = Pick<NewJobCat, 'id'>;

type JobCatFormGroupContent = {
  id: FormControl<IJobCat['id'] | NewJobCat['id']>;
  name: FormControl<IJobCat['name']>;
  description: FormControl<IJobCat['description']>;
};

export type JobCatFormGroup = FormGroup<JobCatFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class JobCatFormService {
  createJobCatFormGroup(jobCat: JobCatFormGroupInput = { id: null }): JobCatFormGroup {
    const jobCatRawValue = {
      ...this.getFormDefaults(),
      ...jobCat,
    };
    return new FormGroup<JobCatFormGroupContent>({
      id: new FormControl(
        { value: jobCatRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(jobCatRawValue.name, {
        validators: [Validators.required],
      }),
      description: new FormControl(jobCatRawValue.description, {
        validators: [Validators.required],
      }),
    });
  }

  getJobCat(form: JobCatFormGroup): IJobCat | NewJobCat {
    return form.getRawValue() as IJobCat | NewJobCat;
  }

  resetForm(form: JobCatFormGroup, jobCat: JobCatFormGroupInput): void {
    const jobCatRawValue = { ...this.getFormDefaults(), ...jobCat };
    form.reset(
      {
        ...jobCatRawValue,
        id: { value: jobCatRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): JobCatFormDefaults {
    return {
      id: null,
    };
  }
}
