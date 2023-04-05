import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICompagny, NewCompagny } from '../compagny.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICompagny for edit and NewCompagnyFormGroupInput for create.
 */
type CompagnyFormGroupInput = ICompagny | PartialWithRequiredKeyOf<NewCompagny>;

type CompagnyFormDefaults = Pick<NewCompagny, 'id'>;

type CompagnyFormGroupContent = {
  id: FormControl<ICompagny['id'] | NewCompagny['id']>;
  name: FormControl<ICompagny['name']>;
  description: FormControl<ICompagny['description']>;
  phone: FormControl<ICompagny['phone']>;
  logoUrl: FormControl<ICompagny['logoUrl']>;
  address: FormControl<ICompagny['address']>;
};

export type CompagnyFormGroup = FormGroup<CompagnyFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CompagnyFormService {
  createCompagnyFormGroup(compagny: CompagnyFormGroupInput = { id: null }): CompagnyFormGroup {
    const compagnyRawValue = {
      ...this.getFormDefaults(),
      ...compagny,
    };
    return new FormGroup<CompagnyFormGroupContent>({
      id: new FormControl(
        { value: compagnyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(compagnyRawValue.name, {
        validators: [Validators.required],
      }),
      description: new FormControl(compagnyRawValue.description, {
        validators: [Validators.required],
      }),
      phone: new FormControl(compagnyRawValue.phone, {
        validators: [Validators.required],
      }),
      logoUrl: new FormControl(compagnyRawValue.logoUrl),
      address: new FormControl(compagnyRawValue.address),
    });
  }

  getCompagny(form: CompagnyFormGroup): ICompagny | NewCompagny {
    return form.getRawValue() as ICompagny | NewCompagny;
  }

  resetForm(form: CompagnyFormGroup, compagny: CompagnyFormGroupInput): void {
    const compagnyRawValue = { ...this.getFormDefaults(), ...compagny };
    form.reset(
      {
        ...compagnyRawValue,
        id: { value: compagnyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CompagnyFormDefaults {
    return {
      id: null,
    };
  }
}
