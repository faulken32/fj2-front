import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IApplication, NewApplication } from '../application.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IApplication for edit and NewApplicationFormGroupInput for create.
 */
type ApplicationFormGroupInput = IApplication | PartialWithRequiredKeyOf<NewApplication>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IApplication | NewApplication> = Omit<T, 'date'> & {
  date?: string | null;
};

type ApplicationFormRawValue = FormValueOf<IApplication>;

type NewApplicationFormRawValue = FormValueOf<NewApplication>;

type ApplicationFormDefaults = Pick<NewApplication, 'id' | 'date'>;

type ApplicationFormGroupContent = {
  id: FormControl<ApplicationFormRawValue['id'] | NewApplication['id']>;
  date: FormControl<ApplicationFormRawValue['date']>;
  status: FormControl<ApplicationFormRawValue['status']>;
  job: FormControl<ApplicationFormRawValue['job']>;
  candidate: FormControl<ApplicationFormRawValue['candidate']>;
};

export type ApplicationFormGroup = FormGroup<ApplicationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ApplicationFormService {
  createApplicationFormGroup(application: ApplicationFormGroupInput = { id: null }): ApplicationFormGroup {
    const applicationRawValue = this.convertApplicationToApplicationRawValue({
      ...this.getFormDefaults(),
      ...application,
    });
    return new FormGroup<ApplicationFormGroupContent>({
      id: new FormControl(
        { value: applicationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      date: new FormControl(applicationRawValue.date),
      status: new FormControl(applicationRawValue.status),
      job: new FormControl(applicationRawValue.job),
      candidate: new FormControl(applicationRawValue.candidate),
    });
  }

  getApplication(form: ApplicationFormGroup): IApplication | NewApplication {
    return this.convertApplicationRawValueToApplication(form.getRawValue() as ApplicationFormRawValue | NewApplicationFormRawValue);
  }

  resetForm(form: ApplicationFormGroup, application: ApplicationFormGroupInput): void {
    const applicationRawValue = this.convertApplicationToApplicationRawValue({ ...this.getFormDefaults(), ...application });
    form.reset(
      {
        ...applicationRawValue,
        id: { value: applicationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ApplicationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      date: currentTime,
    };
  }

  private convertApplicationRawValueToApplication(
    rawApplication: ApplicationFormRawValue | NewApplicationFormRawValue
  ): IApplication | NewApplication {
    return {
      ...rawApplication,
      date: dayjs(rawApplication.date, DATE_TIME_FORMAT),
    };
  }

  private convertApplicationToApplicationRawValue(
    application: IApplication | (Partial<NewApplication> & ApplicationFormDefaults)
  ): ApplicationFormRawValue | PartialWithRequiredKeyOf<NewApplicationFormRawValue> {
    return {
      ...application,
      date: application.date ? application.date.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
