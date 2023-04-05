import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICv, NewCv } from '../cv.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICv for edit and NewCvFormGroupInput for create.
 */
type CvFormGroupInput = ICv | PartialWithRequiredKeyOf<NewCv>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICv | NewCv> = Omit<T, 'updateDate'> & {
  updateDate?: string | null;
};

type CvFormRawValue = FormValueOf<ICv>;

type NewCvFormRawValue = FormValueOf<NewCv>;

type CvFormDefaults = Pick<NewCv, 'id' | 'updateDate'>;

type CvFormGroupContent = {
  id: FormControl<CvFormRawValue['id'] | NewCv['id']>;
  name: FormControl<CvFormRawValue['name']>;
  updateDate: FormControl<CvFormRawValue['updateDate']>;
  format: FormControl<CvFormRawValue['format']>;
};

export type CvFormGroup = FormGroup<CvFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CvFormService {
  createCvFormGroup(cv: CvFormGroupInput = { id: null }): CvFormGroup {
    const cvRawValue = this.convertCvToCvRawValue({
      ...this.getFormDefaults(),
      ...cv,
    });
    return new FormGroup<CvFormGroupContent>({
      id: new FormControl(
        { value: cvRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(cvRawValue.name, {
        validators: [Validators.required],
      }),
      updateDate: new FormControl(cvRawValue.updateDate),
      format: new FormControl(cvRawValue.format),
    });
  }

  getCv(form: CvFormGroup): ICv | NewCv {
    return this.convertCvRawValueToCv(form.getRawValue() as CvFormRawValue | NewCvFormRawValue);
  }

  resetForm(form: CvFormGroup, cv: CvFormGroupInput): void {
    const cvRawValue = this.convertCvToCvRawValue({ ...this.getFormDefaults(), ...cv });
    form.reset(
      {
        ...cvRawValue,
        id: { value: cvRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CvFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      updateDate: currentTime,
    };
  }

  private convertCvRawValueToCv(rawCv: CvFormRawValue | NewCvFormRawValue): ICv | NewCv {
    return {
      ...rawCv,
      updateDate: dayjs(rawCv.updateDate, DATE_TIME_FORMAT),
    };
  }

  private convertCvToCvRawValue(cv: ICv | (Partial<NewCv> & CvFormDefaults)): CvFormRawValue | PartialWithRequiredKeyOf<NewCvFormRawValue> {
    return {
      ...cv,
      updateDate: cv.updateDate ? cv.updateDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
