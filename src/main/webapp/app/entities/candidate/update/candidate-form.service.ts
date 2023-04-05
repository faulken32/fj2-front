import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICandidate, NewCandidate } from '../candidate.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICandidate for edit and NewCandidateFormGroupInput for create.
 */
type CandidateFormGroupInput = ICandidate | PartialWithRequiredKeyOf<NewCandidate>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICandidate | NewCandidate> = Omit<T, 'validUntil'> & {
  validUntil?: string | null;
};

type CandidateFormRawValue = FormValueOf<ICandidate>;

type NewCandidateFormRawValue = FormValueOf<NewCandidate>;

type CandidateFormDefaults = Pick<NewCandidate, 'id' | 'valid' | 'validUntil'>;

type CandidateFormGroupContent = {
  id: FormControl<CandidateFormRawValue['id'] | NewCandidate['id']>;
  userId: FormControl<CandidateFormRawValue['userId']>;
  name: FormControl<CandidateFormRawValue['name']>;
  phone: FormControl<CandidateFormRawValue['phone']>;
  valid: FormControl<CandidateFormRawValue['valid']>;
  validUntil: FormControl<CandidateFormRawValue['validUntil']>;
  candidatePreference: FormControl<CandidateFormRawValue['candidatePreference']>;
  cv: FormControl<CandidateFormRawValue['cv']>;
};

export type CandidateFormGroup = FormGroup<CandidateFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CandidateFormService {
  createCandidateFormGroup(candidate: CandidateFormGroupInput = { id: null }): CandidateFormGroup {
    const candidateRawValue = this.convertCandidateToCandidateRawValue({
      ...this.getFormDefaults(),
      ...candidate,
    });
    return new FormGroup<CandidateFormGroupContent>({
      id: new FormControl(
        { value: candidateRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      userId: new FormControl(candidateRawValue.userId),
      name: new FormControl(candidateRawValue.name, {
        validators: [Validators.required],
      }),
      phone: new FormControl(candidateRawValue.phone, {
        validators: [Validators.required],
      }),
      valid: new FormControl(candidateRawValue.valid),
      validUntil: new FormControl(candidateRawValue.validUntil),
      candidatePreference: new FormControl(candidateRawValue.candidatePreference),
      cv: new FormControl(candidateRawValue.cv),
    });
  }

  getCandidate(form: CandidateFormGroup): ICandidate | NewCandidate {
    return this.convertCandidateRawValueToCandidate(form.getRawValue() as CandidateFormRawValue | NewCandidateFormRawValue);
  }

  resetForm(form: CandidateFormGroup, candidate: CandidateFormGroupInput): void {
    const candidateRawValue = this.convertCandidateToCandidateRawValue({ ...this.getFormDefaults(), ...candidate });
    form.reset(
      {
        ...candidateRawValue,
        id: { value: candidateRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CandidateFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      valid: false,
      validUntil: currentTime,
    };
  }

  private convertCandidateRawValueToCandidate(rawCandidate: CandidateFormRawValue | NewCandidateFormRawValue): ICandidate | NewCandidate {
    return {
      ...rawCandidate,
      validUntil: dayjs(rawCandidate.validUntil, DATE_TIME_FORMAT),
    };
  }

  private convertCandidateToCandidateRawValue(
    candidate: ICandidate | (Partial<NewCandidate> & CandidateFormDefaults)
  ): CandidateFormRawValue | PartialWithRequiredKeyOf<NewCandidateFormRawValue> {
    return {
      ...candidate,
      validUntil: candidate.validUntil ? candidate.validUntil.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
