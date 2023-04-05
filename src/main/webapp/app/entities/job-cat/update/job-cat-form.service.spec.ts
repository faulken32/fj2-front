import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../job-cat.test-samples';

import { JobCatFormService } from './job-cat-form.service';

describe('JobCat Form Service', () => {
  let service: JobCatFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobCatFormService);
  });

  describe('Service methods', () => {
    describe('createJobCatFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createJobCatFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing IJobCat should create a new form with FormGroup', () => {
        const formGroup = service.createJobCatFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getJobCat', () => {
      it('should return NewJobCat for default JobCat initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createJobCatFormGroup(sampleWithNewData);

        const jobCat = service.getJobCat(formGroup) as any;

        expect(jobCat).toMatchObject(sampleWithNewData);
      });

      it('should return NewJobCat for empty JobCat initial value', () => {
        const formGroup = service.createJobCatFormGroup();

        const jobCat = service.getJobCat(formGroup) as any;

        expect(jobCat).toMatchObject({});
      });

      it('should return IJobCat', () => {
        const formGroup = service.createJobCatFormGroup(sampleWithRequiredData);

        const jobCat = service.getJobCat(formGroup) as any;

        expect(jobCat).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IJobCat should not enable id FormControl', () => {
        const formGroup = service.createJobCatFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewJobCat should disable id FormControl', () => {
        const formGroup = service.createJobCatFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
