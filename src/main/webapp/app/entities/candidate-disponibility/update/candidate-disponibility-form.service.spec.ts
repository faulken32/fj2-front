import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../candidate-disponibility.test-samples';

import { CandidateDisponibilityFormService } from './candidate-disponibility-form.service';

describe('CandidateDisponibility Form Service', () => {
  let service: CandidateDisponibilityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateDisponibilityFormService);
  });

  describe('Service methods', () => {
    describe('createCandidateDisponibilityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCandidateDisponibilityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dipoTime: expect.any(Object),
            dispoPeriod: expect.any(Object),
            candidate: expect.any(Object),
          })
        );
      });

      it('passing ICandidateDisponibility should create a new form with FormGroup', () => {
        const formGroup = service.createCandidateDisponibilityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dipoTime: expect.any(Object),
            dispoPeriod: expect.any(Object),
            candidate: expect.any(Object),
          })
        );
      });
    });

    describe('getCandidateDisponibility', () => {
      it('should return NewCandidateDisponibility for default CandidateDisponibility initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCandidateDisponibilityFormGroup(sampleWithNewData);

        const candidateDisponibility = service.getCandidateDisponibility(formGroup) as any;

        expect(candidateDisponibility).toMatchObject(sampleWithNewData);
      });

      it('should return NewCandidateDisponibility for empty CandidateDisponibility initial value', () => {
        const formGroup = service.createCandidateDisponibilityFormGroup();

        const candidateDisponibility = service.getCandidateDisponibility(formGroup) as any;

        expect(candidateDisponibility).toMatchObject({});
      });

      it('should return ICandidateDisponibility', () => {
        const formGroup = service.createCandidateDisponibilityFormGroup(sampleWithRequiredData);

        const candidateDisponibility = service.getCandidateDisponibility(formGroup) as any;

        expect(candidateDisponibility).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICandidateDisponibility should not enable id FormControl', () => {
        const formGroup = service.createCandidateDisponibilityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCandidateDisponibility should disable id FormControl', () => {
        const formGroup = service.createCandidateDisponibilityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
