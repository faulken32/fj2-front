import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../compagny.test-samples';

import { CompagnyFormService } from './compagny-form.service';

describe('Compagny Form Service', () => {
  let service: CompagnyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompagnyFormService);
  });

  describe('Service methods', () => {
    describe('createCompagnyFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCompagnyFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            phone: expect.any(Object),
            logoUrl: expect.any(Object),
            address: expect.any(Object),
          })
        );
      });

      it('passing ICompagny should create a new form with FormGroup', () => {
        const formGroup = service.createCompagnyFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            phone: expect.any(Object),
            logoUrl: expect.any(Object),
            address: expect.any(Object),
          })
        );
      });
    });

    describe('getCompagny', () => {
      it('should return NewCompagny for default Compagny initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCompagnyFormGroup(sampleWithNewData);

        const compagny = service.getCompagny(formGroup) as any;

        expect(compagny).toMatchObject(sampleWithNewData);
      });

      it('should return NewCompagny for empty Compagny initial value', () => {
        const formGroup = service.createCompagnyFormGroup();

        const compagny = service.getCompagny(formGroup) as any;

        expect(compagny).toMatchObject({});
      });

      it('should return ICompagny', () => {
        const formGroup = service.createCompagnyFormGroup(sampleWithRequiredData);

        const compagny = service.getCompagny(formGroup) as any;

        expect(compagny).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICompagny should not enable id FormControl', () => {
        const formGroup = service.createCompagnyFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCompagny should disable id FormControl', () => {
        const formGroup = service.createCompagnyFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
