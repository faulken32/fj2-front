import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CandidateDisponibilityFormService } from './candidate-disponibility-form.service';
import { CandidateDisponibilityService } from '../service/candidate-disponibility.service';
import { ICandidateDisponibility } from '../candidate-disponibility.model';
import { ICandidate } from 'app/entities/candidate/candidate.model';
import { CandidateService } from 'app/entities/candidate/service/candidate.service';

import { CandidateDisponibilityUpdateComponent } from './candidate-disponibility-update.component';

describe('CandidateDisponibility Management Update Component', () => {
  let comp: CandidateDisponibilityUpdateComponent;
  let fixture: ComponentFixture<CandidateDisponibilityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let candidateDisponibilityFormService: CandidateDisponibilityFormService;
  let candidateDisponibilityService: CandidateDisponibilityService;
  let candidateService: CandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CandidateDisponibilityUpdateComponent],
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
      .overrideTemplate(CandidateDisponibilityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CandidateDisponibilityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    candidateDisponibilityFormService = TestBed.inject(CandidateDisponibilityFormService);
    candidateDisponibilityService = TestBed.inject(CandidateDisponibilityService);
    candidateService = TestBed.inject(CandidateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Candidate query and add missing value', () => {
      const candidateDisponibility: ICandidateDisponibility = { id: 456 };
      const candidate: ICandidate = { id: 33329 };
      candidateDisponibility.candidate = candidate;

      const candidateCollection: ICandidate[] = [{ id: 32630 }];
      jest.spyOn(candidateService, 'query').mockReturnValue(of(new HttpResponse({ body: candidateCollection })));
      const additionalCandidates = [candidate];
      const expectedCollection: ICandidate[] = [...additionalCandidates, ...candidateCollection];
      jest.spyOn(candidateService, 'addCandidateToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ candidateDisponibility });
      comp.ngOnInit();

      expect(candidateService.query).toHaveBeenCalled();
      expect(candidateService.addCandidateToCollectionIfMissing).toHaveBeenCalledWith(
        candidateCollection,
        ...additionalCandidates.map(expect.objectContaining)
      );
      expect(comp.candidatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const candidateDisponibility: ICandidateDisponibility = { id: 456 };
      const candidate: ICandidate = { id: 28527 };
      candidateDisponibility.candidate = candidate;

      activatedRoute.data = of({ candidateDisponibility });
      comp.ngOnInit();

      expect(comp.candidatesSharedCollection).toContain(candidate);
      expect(comp.candidateDisponibility).toEqual(candidateDisponibility);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidateDisponibility>>();
      const candidateDisponibility = { id: 123 };
      jest.spyOn(candidateDisponibilityFormService, 'getCandidateDisponibility').mockReturnValue(candidateDisponibility);
      jest.spyOn(candidateDisponibilityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidateDisponibility });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: candidateDisponibility }));
      saveSubject.complete();

      // THEN
      expect(candidateDisponibilityFormService.getCandidateDisponibility).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(candidateDisponibilityService.update).toHaveBeenCalledWith(expect.objectContaining(candidateDisponibility));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidateDisponibility>>();
      const candidateDisponibility = { id: 123 };
      jest.spyOn(candidateDisponibilityFormService, 'getCandidateDisponibility').mockReturnValue({ id: null });
      jest.spyOn(candidateDisponibilityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidateDisponibility: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: candidateDisponibility }));
      saveSubject.complete();

      // THEN
      expect(candidateDisponibilityFormService.getCandidateDisponibility).toHaveBeenCalled();
      expect(candidateDisponibilityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidateDisponibility>>();
      const candidateDisponibility = { id: 123 };
      jest.spyOn(candidateDisponibilityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidateDisponibility });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(candidateDisponibilityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCandidate', () => {
      it('Should forward to candidateService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(candidateService, 'compareCandidate');
        comp.compareCandidate(entity, entity2);
        expect(candidateService.compareCandidate).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
