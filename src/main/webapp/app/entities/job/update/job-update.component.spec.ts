import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { JobFormService } from './job-form.service';
import { JobService } from '../service/job.service';
import { IJob } from '../job.model';
import { IAddress } from 'app/entities/address/address.model';
import { AddressService } from 'app/entities/address/service/address.service';
import { IContact } from 'app/entities/contact/contact.model';
import { ContactService } from 'app/entities/contact/service/contact.service';
import { IJobSubCat } from 'app/entities/job-sub-cat/job-sub-cat.model';
import { JobSubCatService } from 'app/entities/job-sub-cat/service/job-sub-cat.service';
import { ICandidate } from 'app/entities/candidate/candidate.model';
import { CandidateService } from 'app/entities/candidate/service/candidate.service';
import { ICompagny } from 'app/entities/compagny/compagny.model';
import { CompagnyService } from 'app/entities/compagny/service/compagny.service';

import { JobUpdateComponent } from './job-update.component';

describe('Job Management Update Component', () => {
  let comp: JobUpdateComponent;
  let fixture: ComponentFixture<JobUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jobFormService: JobFormService;
  let jobService: JobService;
  let addressService: AddressService;
  let contactService: ContactService;
  let jobSubCatService: JobSubCatService;
  let candidateService: CandidateService;
  let compagnyService: CompagnyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [JobUpdateComponent],
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
      .overrideTemplate(JobUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JobUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jobFormService = TestBed.inject(JobFormService);
    jobService = TestBed.inject(JobService);
    addressService = TestBed.inject(AddressService);
    contactService = TestBed.inject(ContactService);
    jobSubCatService = TestBed.inject(JobSubCatService);
    candidateService = TestBed.inject(CandidateService);
    compagnyService = TestBed.inject(CompagnyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call address query and add missing value', () => {
      const job: IJob = { id: 456 };
      const address: IAddress = { id: 33817 };
      job.address = address;

      const addressCollection: IAddress[] = [{ id: 97376 }];
      jest.spyOn(addressService, 'query').mockReturnValue(of(new HttpResponse({ body: addressCollection })));
      const expectedCollection: IAddress[] = [address, ...addressCollection];
      jest.spyOn(addressService, 'addAddressToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(addressService.query).toHaveBeenCalled();
      expect(addressService.addAddressToCollectionIfMissing).toHaveBeenCalledWith(addressCollection, address);
      expect(comp.addressesCollection).toEqual(expectedCollection);
    });

    it('Should call contact query and add missing value', () => {
      const job: IJob = { id: 456 };
      const contact: IContact = { id: 80603 };
      job.contact = contact;

      const contactCollection: IContact[] = [{ id: 6465 }];
      jest.spyOn(contactService, 'query').mockReturnValue(of(new HttpResponse({ body: contactCollection })));
      const expectedCollection: IContact[] = [contact, ...contactCollection];
      jest.spyOn(contactService, 'addContactToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(contactService.query).toHaveBeenCalled();
      expect(contactService.addContactToCollectionIfMissing).toHaveBeenCalledWith(contactCollection, contact);
      expect(comp.contactsCollection).toEqual(expectedCollection);
    });

    it('Should call JobSubCat query and add missing value', () => {
      const job: IJob = { id: 456 };
      const jobSubCat: IJobSubCat = { id: 2905 };
      job.jobSubCat = jobSubCat;

      const jobSubCatCollection: IJobSubCat[] = [{ id: 89177 }];
      jest.spyOn(jobSubCatService, 'query').mockReturnValue(of(new HttpResponse({ body: jobSubCatCollection })));
      const additionalJobSubCats = [jobSubCat];
      const expectedCollection: IJobSubCat[] = [...additionalJobSubCats, ...jobSubCatCollection];
      jest.spyOn(jobSubCatService, 'addJobSubCatToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(jobSubCatService.query).toHaveBeenCalled();
      expect(jobSubCatService.addJobSubCatToCollectionIfMissing).toHaveBeenCalledWith(
        jobSubCatCollection,
        ...additionalJobSubCats.map(expect.objectContaining)
      );
      expect(comp.jobSubCatsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Candidate query and add missing value', () => {
      const job: IJob = { id: 456 };
      const candidate: ICandidate = { id: 97566 };
      job.candidate = candidate;

      const candidateCollection: ICandidate[] = [{ id: 8294 }];
      jest.spyOn(candidateService, 'query').mockReturnValue(of(new HttpResponse({ body: candidateCollection })));
      const additionalCandidates = [candidate];
      const expectedCollection: ICandidate[] = [...additionalCandidates, ...candidateCollection];
      jest.spyOn(candidateService, 'addCandidateToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(candidateService.query).toHaveBeenCalled();
      expect(candidateService.addCandidateToCollectionIfMissing).toHaveBeenCalledWith(
        candidateCollection,
        ...additionalCandidates.map(expect.objectContaining)
      );
      expect(comp.candidatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Compagny query and add missing value', () => {
      const job: IJob = { id: 456 };
      const compagny: ICompagny = { id: 27350 };
      job.compagny = compagny;

      const compagnyCollection: ICompagny[] = [{ id: 32456 }];
      jest.spyOn(compagnyService, 'query').mockReturnValue(of(new HttpResponse({ body: compagnyCollection })));
      const additionalCompagnies = [compagny];
      const expectedCollection: ICompagny[] = [...additionalCompagnies, ...compagnyCollection];
      jest.spyOn(compagnyService, 'addCompagnyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(compagnyService.query).toHaveBeenCalled();
      expect(compagnyService.addCompagnyToCollectionIfMissing).toHaveBeenCalledWith(
        compagnyCollection,
        ...additionalCompagnies.map(expect.objectContaining)
      );
      expect(comp.compagniesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const job: IJob = { id: 456 };
      const address: IAddress = { id: 19263 };
      job.address = address;
      const contact: IContact = { id: 49108 };
      job.contact = contact;
      const jobSubCat: IJobSubCat = { id: 17765 };
      job.jobSubCat = jobSubCat;
      const candidate: ICandidate = { id: 57408 };
      job.candidate = candidate;
      const compagny: ICompagny = { id: 90362 };
      job.compagny = compagny;

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(comp.addressesCollection).toContain(address);
      expect(comp.contactsCollection).toContain(contact);
      expect(comp.jobSubCatsSharedCollection).toContain(jobSubCat);
      expect(comp.candidatesSharedCollection).toContain(candidate);
      expect(comp.compagniesSharedCollection).toContain(compagny);
      expect(comp.job).toEqual(job);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJob>>();
      const job = { id: 123 };
      jest.spyOn(jobFormService, 'getJob').mockReturnValue(job);
      jest.spyOn(jobService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: job }));
      saveSubject.complete();

      // THEN
      expect(jobFormService.getJob).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(jobService.update).toHaveBeenCalledWith(expect.objectContaining(job));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJob>>();
      const job = { id: 123 };
      jest.spyOn(jobFormService, 'getJob').mockReturnValue({ id: null });
      jest.spyOn(jobService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: job }));
      saveSubject.complete();

      // THEN
      expect(jobFormService.getJob).toHaveBeenCalled();
      expect(jobService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJob>>();
      const job = { id: 123 };
      jest.spyOn(jobService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jobService.update).toHaveBeenCalled();
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

    describe('compareContact', () => {
      it('Should forward to contactService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(contactService, 'compareContact');
        comp.compareContact(entity, entity2);
        expect(contactService.compareContact).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareJobSubCat', () => {
      it('Should forward to jobSubCatService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(jobSubCatService, 'compareJobSubCat');
        comp.compareJobSubCat(entity, entity2);
        expect(jobSubCatService.compareJobSubCat).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCandidate', () => {
      it('Should forward to candidateService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(candidateService, 'compareCandidate');
        comp.compareCandidate(entity, entity2);
        expect(candidateService.compareCandidate).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCompagny', () => {
      it('Should forward to compagnyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(compagnyService, 'compareCompagny');
        comp.compareCompagny(entity, entity2);
        expect(compagnyService.compareCompagny).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
