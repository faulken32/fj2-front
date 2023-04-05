import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICandidateDisponibility, NewCandidateDisponibility } from '../candidate-disponibility.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICandidateDisponibility for edit and NewCandidateDisponibilityFormGroupInput for create.
 */
type CandidateDisponibilityFormGroupInput = ICandidateDisponibility | PartialWithRequiredKeyOf<NewCandidateDisponibility>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICandidateDisponibility | NewCandidateDisponibility> = Omit<T, 'dipoTime'> & {
  dipoTime?: string | null;
};

type CandidateDisponibilityFormRawValue = FormValueOf<ICandidateDisponibility>;

type NewCandidateDisponibilityFormRawValue = FormValueOf<NewCandidateDisponibility>;

type CandidateDisponibilityFormDefaults = Pick<NewCandidateDisponibility, 'id' | 'dipoTime'>;

type CandidateDisponibilityFormGroupContent = {
  id: FormControl<CandidateDisponibilityFormRawValue['id'] | NewCandidateDisponibility['id']>;
  dipoTime: FormControl<CandidateDisponibilityFormRawValue['dipoTime']>;
  dispoPeriod: FormControl<CandidateDisponibilityFormRawValue['dispoPeriod']>;
  candidate: FormControl<CandidateDisponibilityFormRawValue['candidate']>;
};

export type CandidateDisponibilityFormGroup = FormGroup<CandidateDisponibilityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CandidateDisponibilityFormService {
  createCandidateDisponibilityFormGroup(
    candidateDisponibility: CandidateDisponibilityFormGroupInput = { id: null }
  ): CandidateDisponibilityFormGroup {
    const candidateDisponibilityRawValue = this.convertCandidateDisponibilityToCandidateDisponibilityRawValue({
      ...this.getFormDefaults(),
      ...candidateDisponibility,
    });
    return new FormGroup<CandidateDisponibilityFormGroupContent>({
      id: new FormControl(
        { value: candidateDisponibilityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      dipoTime: new FormControl(candidateDisponibilityRawValue.dipoTime, {
        validators: [Validators.required],
      }),
      dispoPeriod: new FormControl(candidateDisponibilityRawValue.dispoPeriod, {
        validators: [Validators.required],
      }),
      candidate: new FormControl(candidateDisponibilityRawValue.candidate),
    });
  }

  getCandidateDisponibility(form: CandidateDisponibilityFormGroup): ICandidateDisponibility | NewCandidateDisponibility {
    return this.convertCandidateDisponibilityRawValueToCandidateDisponibility(
      form.getRawValue() as CandidateDisponibilityFormRawValue | NewCandidateDisponibilityFormRawValue
    );
  }

  resetForm(form: CandidateDisponibilityFormGroup, candidateDisponibility: CandidateDisponibilityFormGroupInput): void {
    const candidateDisponibilityRawValue = this.convertCandidateDisponibilityToCandidateDisponibilityRawValue({
      ...this.getFormDefaults(),
      ...candidateDisponibility,
    });
    form.reset(
      {
        ...candidateDisponibilityRawValue,
        id: { value: candidateDisponibilityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CandidateDisponibilityFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dipoTime: currentTime,
    };
  }

  private convertCandidateDisponibilityRawValueToCandidateDisponibility(
    rawCandidateDisponibility: CandidateDisponibilityFormRawValue | NewCandidateDisponibilityFormRawValue
  ): ICandidateDisponibility | NewCandidateDisponibility {
    return {
      ...rawCandidateDisponibility,
      dipoTime: dayjs(rawCandidateDisponibility.dipoTime, DATE_TIME_FORMAT),
    };
  }

  private convertCandidateDisponibilityToCandidateDisponibilityRawValue(
    candidateDisponibility: ICandidateDisponibility | (Partial<NewCandidateDisponibility> & CandidateDisponibilityFormDefaults)
  ): CandidateDisponibilityFormRawValue | PartialWithRequiredKeyOf<NewCandidateDisponibilityFormRawValue> {
    return {
      ...candidateDisponibility,
      dipoTime: candidateDisponibility.dipoTime ? candidateDisponibility.dipoTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
