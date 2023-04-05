import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICandidatePreference, NewCandidatePreference } from '../candidate-preference.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICandidatePreference for edit and NewCandidatePreferenceFormGroupInput for create.
 */
type CandidatePreferenceFormGroupInput = ICandidatePreference | PartialWithRequiredKeyOf<NewCandidatePreference>;

type CandidatePreferenceFormDefaults = Pick<NewCandidatePreference, 'id'>;

type CandidatePreferenceFormGroupContent = {
  id: FormControl<ICandidatePreference['id'] | NewCandidatePreference['id']>;
  distance: FormControl<ICandidatePreference['distance']>;
};

export type CandidatePreferenceFormGroup = FormGroup<CandidatePreferenceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CandidatePreferenceFormService {
  createCandidatePreferenceFormGroup(candidatePreference: CandidatePreferenceFormGroupInput = { id: null }): CandidatePreferenceFormGroup {
    const candidatePreferenceRawValue = {
      ...this.getFormDefaults(),
      ...candidatePreference,
    };
    return new FormGroup<CandidatePreferenceFormGroupContent>({
      id: new FormControl(
        { value: candidatePreferenceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      distance: new FormControl(candidatePreferenceRawValue.distance, {
        validators: [Validators.min(0), Validators.max(100)],
      }),
    });
  }

  getCandidatePreference(form: CandidatePreferenceFormGroup): ICandidatePreference | NewCandidatePreference {
    return form.getRawValue() as ICandidatePreference | NewCandidatePreference;
  }

  resetForm(form: CandidatePreferenceFormGroup, candidatePreference: CandidatePreferenceFormGroupInput): void {
    const candidatePreferenceRawValue = { ...this.getFormDefaults(), ...candidatePreference };
    form.reset(
      {
        ...candidatePreferenceRawValue,
        id: { value: candidatePreferenceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CandidatePreferenceFormDefaults {
    return {
      id: null,
    };
  }
}
