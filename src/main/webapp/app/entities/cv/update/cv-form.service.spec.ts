import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cv.test-samples';

import { CvFormService } from './cv-form.service';

describe('Cv Form Service', () => {
  let service: CvFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvFormService);
  });

  describe('Service methods', () => {
    describe('createCvFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCvFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            updateDate: expect.any(Object),
            format: expect.any(Object),
          })
        );
      });

      it('passing ICv should create a new form with FormGroup', () => {
        const formGroup = service.createCvFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            updateDate: expect.any(Object),
            format: expect.any(Object),
          })
        );
      });
    });

    describe('getCv', () => {
      it('should return NewCv for default Cv initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCvFormGroup(sampleWithNewData);

        const cv = service.getCv(formGroup) as any;

        expect(cv).toMatchObject(sampleWithNewData);
      });

      it('should return NewCv for empty Cv initial value', () => {
        const formGroup = service.createCvFormGroup();

        const cv = service.getCv(formGroup) as any;

        expect(cv).toMatchObject({});
      });

      it('should return ICv', () => {
        const formGroup = service.createCvFormGroup(sampleWithRequiredData);

        const cv = service.getCv(formGroup) as any;

        expect(cv).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICv should not enable id FormControl', () => {
        const formGroup = service.createCvFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCv should disable id FormControl', () => {
        const formGroup = service.createCvFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
