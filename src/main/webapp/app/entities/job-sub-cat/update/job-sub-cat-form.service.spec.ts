import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../job-sub-cat.test-samples';

import { JobSubCatFormService } from './job-sub-cat-form.service';

describe('JobSubCat Form Service', () => {
  let service: JobSubCatFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobSubCatFormService);
  });

  describe('Service methods', () => {
    describe('createJobSubCatFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createJobSubCatFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            jobCat: expect.any(Object),
            candidatePreference: expect.any(Object),
          })
        );
      });

      it('passing IJobSubCat should create a new form with FormGroup', () => {
        const formGroup = service.createJobSubCatFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            jobCat: expect.any(Object),
            candidatePreference: expect.any(Object),
          })
        );
      });
    });

    describe('getJobSubCat', () => {
      it('should return NewJobSubCat for default JobSubCat initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createJobSubCatFormGroup(sampleWithNewData);

        const jobSubCat = service.getJobSubCat(formGroup) as any;

        expect(jobSubCat).toMatchObject(sampleWithNewData);
      });

      it('should return NewJobSubCat for empty JobSubCat initial value', () => {
        const formGroup = service.createJobSubCatFormGroup();

        const jobSubCat = service.getJobSubCat(formGroup) as any;

        expect(jobSubCat).toMatchObject({});
      });

      it('should return IJobSubCat', () => {
        const formGroup = service.createJobSubCatFormGroup(sampleWithRequiredData);

        const jobSubCat = service.getJobSubCat(formGroup) as any;

        expect(jobSubCat).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IJobSubCat should not enable id FormControl', () => {
        const formGroup = service.createJobSubCatFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewJobSubCat should disable id FormControl', () => {
        const formGroup = service.createJobSubCatFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
