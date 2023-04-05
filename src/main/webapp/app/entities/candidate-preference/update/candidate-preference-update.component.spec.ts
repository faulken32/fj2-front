import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CandidatePreferenceFormService } from './candidate-preference-form.service';
import { CandidatePreferenceService } from '../service/candidate-preference.service';
import { ICandidatePreference } from '../candidate-preference.model';

import { CandidatePreferenceUpdateComponent } from './candidate-preference-update.component';

describe('CandidatePreference Management Update Component', () => {
  let comp: CandidatePreferenceUpdateComponent;
  let fixture: ComponentFixture<CandidatePreferenceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let candidatePreferenceFormService: CandidatePreferenceFormService;
  let candidatePreferenceService: CandidatePreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CandidatePreferenceUpdateComponent],
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
      .overrideTemplate(CandidatePreferenceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CandidatePreferenceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    candidatePreferenceFormService = TestBed.inject(CandidatePreferenceFormService);
    candidatePreferenceService = TestBed.inject(CandidatePreferenceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const candidatePreference: ICandidatePreference = { id: 456 };

      activatedRoute.data = of({ candidatePreference });
      comp.ngOnInit();

      expect(comp.candidatePreference).toEqual(candidatePreference);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidatePreference>>();
      const candidatePreference = { id: 123 };
      jest.spyOn(candidatePreferenceFormService, 'getCandidatePreference').mockReturnValue(candidatePreference);
      jest.spyOn(candidatePreferenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidatePreference });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: candidatePreference }));
      saveSubject.complete();

      // THEN
      expect(candidatePreferenceFormService.getCandidatePreference).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(candidatePreferenceService.update).toHaveBeenCalledWith(expect.objectContaining(candidatePreference));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidatePreference>>();
      const candidatePreference = { id: 123 };
      jest.spyOn(candidatePreferenceFormService, 'getCandidatePreference').mockReturnValue({ id: null });
      jest.spyOn(candidatePreferenceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidatePreference: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: candidatePreference }));
      saveSubject.complete();

      // THEN
      expect(candidatePreferenceFormService.getCandidatePreference).toHaveBeenCalled();
      expect(candidatePreferenceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICandidatePreference>>();
      const candidatePreference = { id: 123 };
      jest.spyOn(candidatePreferenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ candidatePreference });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(candidatePreferenceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
