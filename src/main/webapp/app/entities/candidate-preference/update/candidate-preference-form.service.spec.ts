import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../candidate-preference.test-samples';

import { CandidatePreferenceFormService } from './candidate-preference-form.service';

describe('CandidatePreference Form Service', () => {
  let service: CandidatePreferenceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatePreferenceFormService);
  });

  describe('Service methods', () => {
    describe('createCandidatePreferenceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCandidatePreferenceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            distance: expect.any(Object),
          })
        );
      });

      it('passing ICandidatePreference should create a new form with FormGroup', () => {
        const formGroup = service.createCandidatePreferenceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            distance: expect.any(Object),
          })
        );
      });
    });

    describe('getCandidatePreference', () => {
      it('should return NewCandidatePreference for default CandidatePreference initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCandidatePreferenceFormGroup(sampleWithNewData);

        const candidatePreference = service.getCandidatePreference(formGroup) as any;

        expect(candidatePreference).toMatchObject(sampleWithNewData);
      });

      it('should return NewCandidatePreference for empty CandidatePreference initial value', () => {
        const formGroup = service.createCandidatePreferenceFormGroup();

        const candidatePreference = service.getCandidatePreference(formGroup) as any;

        expect(candidatePreference).toMatchObject({});
      });

      it('should return ICandidatePreference', () => {
        const formGroup = service.createCandidatePreferenceFormGroup(sampleWithRequiredData);

        const candidatePreference = service.getCandidatePreference(formGroup) as any;

        expect(candidatePreference).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICandidatePreference should not enable id FormControl', () => {
        const formGroup = service.createCandidatePreferenceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCandidatePreference should disable id FormControl', () => {
        const formGroup = service.createCandidatePreferenceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
