import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IJob, NewJob } from '../job.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IJob for edit and NewJobFormGroupInput for create.
 */
type JobFormGroupInput = IJob | PartialWithRequiredKeyOf<NewJob>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IJob | NewJob> = Omit<T, 'validUntil'> & {
  validUntil?: string | null;
};

type JobFormRawValue = FormValueOf<IJob>;

type NewJobFormRawValue = FormValueOf<NewJob>;

type JobFormDefaults = Pick<NewJob, 'id' | 'valid' | 'validUntil'>;

type JobFormGroupContent = {
  id: FormControl<JobFormRawValue['id'] | NewJob['id']>;
  name: FormControl<JobFormRawValue['name']>;
  valid: FormControl<JobFormRawValue['valid']>;
  validUntil: FormControl<JobFormRawValue['validUntil']>;
  salary: FormControl<JobFormRawValue['salary']>;
  prime: FormControl<JobFormRawValue['prime']>;
  address: FormControl<JobFormRawValue['address']>;
  contact: FormControl<JobFormRawValue['contact']>;
  jobSubCat: FormControl<JobFormRawValue['jobSubCat']>;
  candidate: FormControl<JobFormRawValue['candidate']>;
  compagny: FormControl<JobFormRawValue['compagny']>;
};

export type JobFormGroup = FormGroup<JobFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class JobFormService {
  createJobFormGroup(job: JobFormGroupInput = { id: null }): JobFormGroup {
    const jobRawValue = this.convertJobToJobRawValue({
      ...this.getFormDefaults(),
      ...job,
    });
    return new FormGroup<JobFormGroupContent>({
      id: new FormControl(
        { value: jobRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(jobRawValue.name, {
        validators: [Validators.required],
      }),
      valid: new FormControl(jobRawValue.valid, {
        validators: [Validators.required],
      }),
      validUntil: new FormControl(jobRawValue.validUntil, {
        validators: [Validators.required],
      }),
      salary: new FormControl(jobRawValue.salary, {
        validators: [Validators.required],
      }),
      prime: new FormControl(jobRawValue.prime),
      address: new FormControl(jobRawValue.address),
      contact: new FormControl(jobRawValue.contact),
      jobSubCat: new FormControl(jobRawValue.jobSubCat),
      candidate: new FormControl(jobRawValue.candidate),
      compagny: new FormControl(jobRawValue.compagny),
    });
  }

  getJob(form: JobFormGroup): IJob | NewJob {
    return this.convertJobRawValueToJob(form.getRawValue() as JobFormRawValue | NewJobFormRawValue);
  }

  resetForm(form: JobFormGroup, job: JobFormGroupInput): void {
    const jobRawValue = this.convertJobToJobRawValue({ ...this.getFormDefaults(), ...job });
    form.reset(
      {
        ...jobRawValue,
        id: { value: jobRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): JobFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      valid: false,
      validUntil: currentTime,
    };
  }

  private convertJobRawValueToJob(rawJob: JobFormRawValue | NewJobFormRawValue): IJob | NewJob {
    return {
      ...rawJob,
      validUntil: dayjs(rawJob.validUntil, DATE_TIME_FORMAT),
    };
  }

  private convertJobToJobRawValue(
    job: IJob | (Partial<NewJob> & JobFormDefaults)
  ): JobFormRawValue | PartialWithRequiredKeyOf<NewJobFormRawValue> {
    return {
      ...job,
      validUntil: job.validUntil ? job.validUntil.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
