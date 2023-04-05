import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CompagnyFormService } from './compagny-form.service';
import { CompagnyService } from '../service/compagny.service';
import { ICompagny } from '../compagny.model';
import { IAddress } from 'app/entities/address/address.model';
import { AddressService } from 'app/entities/address/service/address.service';

import { CompagnyUpdateComponent } from './compagny-update.component';

describe('Compagny Management Update Component', () => {
  let comp: CompagnyUpdateComponent;
  let fixture: ComponentFixture<CompagnyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let compagnyFormService: CompagnyFormService;
  let compagnyService: CompagnyService;
  let addressService: AddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CompagnyUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CompagnyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CompagnyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    compagnyFormService = TestBed.inject(CompagnyFormService);
    compagnyService = TestBed.inject(CompagnyService);
    addressService = TestBed.inject(AddressService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call address query and add missing value', () => {
      const compagny: ICompagny = { id: 456 };
      const address: IAddress = { id: 40656 };
      compagny.address = address;

      const addressCollection: IAddress[] = [{ id: 23027 }];
      jest.spyOn(addressService, 'query').mockReturnValue(of(new HttpResponse({ body: addressCollection })));
      const expectedCollection: IAddress[] = [address, ...addressCollection];
      jest.spyOn(addressService, 'addAddressToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ compagny });
      comp.ngOnInit();

      expect(addressService.query).toHaveBeenCalled();
      expect(addressService.addAddressToCollectionIfMissing).toHaveBeenCalledWith(addressCollection, address);
      expect(comp.addressesCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const compagny: ICompagny = { id: 456 };
      const address: IAddress = { id: 4153 };
      compagny.address = address;

      activatedRoute.data = of({ compagny });
      comp.ngOnInit();

      expect(comp.addressesCollection).toContain(address);
      expect(comp.compagny).toEqual(compagny);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompagny>>();
      const compagny = { id: 123 };
      jest.spyOn(compagnyFormService, 'getCompagny').mockReturnValue(compagny);
      jest.spyOn(compagnyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ compagny });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: compagny }));
      saveSubject.complete();

      // THEN
      expect(compagnyFormService.getCompagny).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(compagnyService.update).toHaveBeenCalledWith(expect.objectContaining(compagny));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompagny>>();
      const compagny = { id: 123 };
      jest.spyOn(compagnyFormService, 'getCompagny').mockReturnValue({ id: null });
      jest.spyOn(compagnyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ compagny: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: compagny }));
      saveSubject.complete();

      // THEN
      expect(compagnyFormService.getCompagny).toHaveBeenCalled();
      expect(compagnyService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICompagny>>();
      const compagny = { id: 123 };
      jest.spyOn(compagnyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ compagny });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(compagnyService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAddress', () => {
      it('Should forward to addressService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(addressService, 'compareAddress');
        comp.compareAddress(entity, entity2);
        expect(addressService.compareAddress).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
