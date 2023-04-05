import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CvFormService } from './cv-form.service';
import { CvService } from '../service/cv.service';
import { ICv } from '../cv.model';

import { CvUpdateComponent } from './cv-update.component';

describe('Cv Management Update Component', () => {
  let comp: CvUpdateComponent;
  let fixture: ComponentFixture<CvUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cvFormService: CvFormService;
  let cvService: CvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CvUpdateComponent],
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
      .overrideTemplate(CvUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CvUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cvFormService = TestBed.inject(CvFormService);
    cvService = TestBed.inject(CvService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cv: ICv = { id: 456 };

      activatedRoute.data = of({ cv });
      comp.ngOnInit();

      expect(comp.cv).toEqual(cv);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICv>>();
      const cv = { id: 123 };
      jest.spyOn(cvFormService, 'getCv').mockReturnValue(cv);
      jest.spyOn(cvService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cv });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cv }));
      saveSubject.complete();

      // THEN
      expect(cvFormService.getCv).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cvService.update).toHaveBeenCalledWith(expect.objectContaining(cv));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICv>>();
      const cv = { id: 123 };
      jest.spyOn(cvFormService, 'getCv').mockReturnValue({ id: null });
      jest.spyOn(cvService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cv: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cv }));
      saveSubject.complete();

      // THEN
      expect(cvFormService.getCv).toHaveBeenCalled();
      expect(cvService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICv>>();
      const cv = { id: 123 };
      jest.spyOn(cvService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cv });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cvService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
