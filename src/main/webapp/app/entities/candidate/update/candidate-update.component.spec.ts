import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CandidateFormService } from './candidate-form.service';
import { CandidateService } from '../service/candidate.service';
import { ICandidate } from '../candidate.model';
import { ICandidatePreference } from 'app/entities/candidate-preference/candidate-preference.model';
import { CandidatePreferenceService } from 'app/entities/candidate-preference/service/candidate-preference.service';
import { ICv } from 'app/entities/cv/cv.model';
import { CvService } from 'app/entities/cv/service/cv.service';

import { CandidateUpdateComponent } from './candidate-update.component';

describe('Candidate Management Update Component', () => {
  let comp: CandidateUpdateComponent;
  let fixture: ComponentFixture<CandidateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let candidateFormService: CandidateFormService;
  let candidateService: CandidateService;
  let candidatePreferenceService: CandidatePreferenceService;
  let cvService: CvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CandidateUpdateComponent],
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
      .overrideTemplate(CandidateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CandidateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    candidateFormService = TestBed.inject(CandidateFormService);
    candidateService = TestBed.inject(CandidateService);
    candidatePreferenceService = TestBed.inject(CandidatePreferenceService);
    cvService = TestBed.inject(CvService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call candidatePreference query and add missing value', () => {
      const candidate: ICandidate = { id: 456 };
      const candidatePreference: ICandidatePreference = { id: 66203 };
      candidate.candidatePreference = candidatePreference;

      const candidatePreferenceCollection: ICandidatePreference[] = [{ id: 22461 }];
      jest.spyOn(candidatePreferenceService, 'query').mockReturnValue(of(new HttpResponse({ body: candidatePreferenceCollection })));
      const expectedCollection: ICandidatePreference[] = [candidatePreference, ...candidatePreferenceCollection];
      jest.spyOn(candidatePreferenceService, 'addCandidatePreferenceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ candidate });
      comp.ngOnInit();

      expect(candidatePreferenceService.query).toHaveBeenCalled();
      expect(candidatePreferenceService.addCandidatePreferenceToCollectionIfMissing).toHaveBeenCalledWith(
        candidatePreferenceCollection,
        candidatePreference
      );
      expect(comp.candidatePreferencesCollection).toEqual(expectedCollection);
    });

    it('Should call Cv query and add missing value', () => {
      const candidate: ICandidate = { id: 456 };
      const cv: ICv = { id: 52065 };
      candidate.cv = cv;

      const cvCollection: ICv[] = [{ id: 54118 }];
      jest.spyOn(cvService, 'query').mockReturnValue(of(new HttpResponse({ body: cvCollection })));
      const additionalCvs = [cv];
      const expectedCollection: ICv[] = [...additionalCvs, ...cvCollection];
      jest.spyOn(cvService, 'addCvToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ candidate });
      comp.ngOnInit();

      expect(cvService.query).toHaveBeenCalled();
      expect(cvService.addCvToCollectionIfMissing).toHaveBeenCalledWith(cvCollection, ...additionalCvs.map(expect.objectContaining));
      expect(comp.cvsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const candidate: ICandidate = { id: 456 };
      const candidatePreference: ICandidatePreference = { id: 92910 };
      candidate.candidatePreference = candidatePreference;
      const cv: ICv = { id: 68222 };
      candidate.cv = cv;

      activatedRoute.data = of({ candidate });
      comp.ngOnInit();

      expect(comp.candidatePreferencesCollection).toContain(candidatePreference);
      expect(comp.cvsSharedCollection).toContain(cv);
      expect(comp.candidate).toEqual(candidate);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidate>>();
      const candidate = { id: 123 };
      jest.spyOn(candidateFormService, 'getCandidate').mockReturnValue(candidate);
      jest.spyOn(candidateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: candidate }));
      saveSubject.complete();

      // THEN
      expect(candidateFormService.getCandidate).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(candidateService.update).toHaveBeenCalledWith(expect.objectContaining(candidate));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidate>>();
      const candidate = { id: 123 };
      jest.spyOn(candidateFormService, 'getCandidate').mockReturnValue({ id: null });
      jest.spyOn(candidateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidate: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: candidate }));
      saveSubject.complete();

      // THEN
      expect(candidateFormService.getCandidate).toHaveBeenCalled();
      expect(candidateService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidate>>();
      const candidate = { id: 123 };
      jest.spyOn(candidateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(candidateService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCandidatePreference', () => {
      it('Should forward to candidatePreferenceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(candidatePreferenceService, 'compareCandidatePreference');
        comp.compareCandidatePreference(entity, entity2);
        expect(candidatePreferenceService.compareCandidatePreference).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCv', () => {
      it('Should forward to cvService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cvService, 'compareCv');
        comp.compareCv(entity, entity2);
        expect(cvService.compareCv).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
