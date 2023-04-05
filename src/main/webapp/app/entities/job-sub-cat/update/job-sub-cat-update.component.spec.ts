import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { JobSubCatFormService } from './job-sub-cat-form.service';
import { JobSubCatService } from '../service/job-sub-cat.service';
import { IJobSubCat } from '../job-sub-cat.model';
import { IJobCat } from 'app/entities/job-cat/job-cat.model';
import { JobCatService } from 'app/entities/job-cat/service/job-cat.service';
import { ICandidatePreference } from 'app/entities/candidate-preference/candidate-preference.model';
import { CandidatePreferenceService } from 'app/entities/candidate-preference/service/candidate-preference.service';

import { JobSubCatUpdateComponent } from './job-sub-cat-update.component';

describe('JobSubCat Management Update Component', () => {
  let comp: JobSubCatUpdateComponent;
  let fixture: ComponentFixture<JobSubCatUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jobSubCatFormService: JobSubCatFormService;
  let jobSubCatService: JobSubCatService;
  let jobCatService: JobCatService;
  let candidatePreferenceService: CandidatePreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [JobSubCatUpdateComponent],
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
      .overrideTemplate(JobSubCatUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JobSubCatUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jobSubCatFormService = TestBed.inject(JobSubCatFormService);
    jobSubCatService = TestBed.inject(JobSubCatService);
    jobCatService = TestBed.inject(JobCatService);
    candidatePreferenceService = TestBed.inject(CandidatePreferenceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call JobCat query and add missing value', () => {
      const jobSubCat: IJobSubCat = { id: 456 };
      const jobCat: IJobCat = { id: 18978 };
      jobSubCat.jobCat = jobCat;

      const jobCatCollection: IJobCat[] = [{ id: 18874 }];
      jest.spyOn(jobCatService, 'query').mockReturnValue(of(new HttpResponse({ body: jobCatCollection })));
      const additionalJobCats = [jobCat];
      const expectedCollection: IJobCat[] = [...additionalJobCats, ...jobCatCollection];
      jest.spyOn(jobCatService, 'addJobCatToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobSubCat });
      comp.ngOnInit();

      expect(jobCatService.query).toHaveBeenCalled();
      expect(jobCatService.addJobCatToCollectionIfMissing).toHaveBeenCalledWith(
        jobCatCollection,
        ...additionalJobCats.map(expect.objectContaining)
      );
      expect(comp.jobCatsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CandidatePreference query and add missing value', () => {
      const jobSubCat: IJobSubCat = { id: 456 };
      const candidatePreference: ICandidatePreference = { id: 26252 };
      jobSubCat.candidatePreference = candidatePreference;

      const candidatePreferenceCollection: ICandidatePreference[] = [{ id: 88554 }];
      jest.spyOn(candidatePreferenceService, 'query').mockReturnValue(of(new HttpResponse({ body: candidatePreferenceCollection })));
      const additionalCandidatePreferences = [candidatePreference];
      const expectedCollection: ICandidatePreference[] = [...additionalCandidatePreferences, ...candidatePreferenceCollection];
      jest.spyOn(candidatePreferenceService, 'addCandidatePreferenceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobSubCat });
      comp.ngOnInit();

      expect(candidatePreferenceService.query).toHaveBeenCalled();
      expect(candidatePreferenceService.addCandidatePreferenceToCollectionIfMissing).toHaveBeenCalledWith(
        candidatePreferenceCollection,
        ...additionalCandidatePreferences.map(expect.objectContaining)
      );
      expect(comp.candidatePreferencesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const jobSubCat: IJobSubCat = { id: 456 };
      const jobCat: IJobCat = { id: 24350 };
      jobSubCat.jobCat = jobCat;
      const candidatePreference: ICandidatePreference = { id: 33141 };
      jobSubCat.candidatePreference = candidatePreference;

      activatedRoute.data = of({ jobSubCat });
      comp.ngOnInit();

      expect(comp.jobCatsSharedCollection).toContain(jobCat);
      expect(comp.candidatePreferencesSharedCollection).toContain(candidatePreference);
      expect(comp.jobSubCat).toEqual(jobSubCat);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobSubCat>>();
      const jobSubCat = { id: 123 };
      jest.spyOn(jobSubCatFormService, 'getJobSubCat').mockReturnValue(jobSubCat);
      jest.spyOn(jobSubCatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobSubCat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobSubCat }));
      saveSubject.complete();

      // THEN
      expect(jobSubCatFormService.getJobSubCat).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(jobSubCatService.update).toHaveBeenCalledWith(expect.objectContaining(jobSubCat));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobSubCat>>();
      const jobSubCat = { id: 123 };
      jest.spyOn(jobSubCatFormService, 'getJobSubCat').mockReturnValue({ id: null });
      jest.spyOn(jobSubCatService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobSubCat: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobSubCat }));
      saveSubject.complete();

      // THEN
      expect(jobSubCatFormService.getJobSubCat).toHaveBeenCalled();
      expect(jobSubCatService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobSubCat>>();
      const jobSubCat = { id: 123 };
      jest.spyOn(jobSubCatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobSubCat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jobSubCatService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareJobCat', () => {
      it('Should forward to jobCatService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(jobCatService, 'compareJobCat');
        comp.compareJobCat(entity, entity2);
        expect(jobCatService.compareJobCat).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCandidatePreference', () => {
      it('Should forward to candidatePreferenceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(candidatePreferenceService, 'compareCandidatePreference');
        comp.compareCandidatePreference(entity, entity2);
        expect(candidatePreferenceService.compareCandidatePreference).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
