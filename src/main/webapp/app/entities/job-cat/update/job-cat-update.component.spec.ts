import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { JobCatFormService } from './job-cat-form.service';
import { JobCatService } from '../service/job-cat.service';
import { IJobCat } from '../job-cat.model';

import { JobCatUpdateComponent } from './job-cat-update.component';

describe('JobCat Management Update Component', () => {
  let comp: JobCatUpdateComponent;
  let fixture: ComponentFixture<JobCatUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jobCatFormService: JobCatFormService;
  let jobCatService: JobCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [JobCatUpdateComponent],
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
      .overrideTemplate(JobCatUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JobCatUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jobCatFormService = TestBed.inject(JobCatFormService);
    jobCatService = TestBed.inject(JobCatService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const jobCat: IJobCat = { id: 456 };

      activatedRoute.data = of({ jobCat });
      comp.ngOnInit();

      expect(comp.jobCat).toEqual(jobCat);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobCat>>();
      const jobCat = { id: 123 };
      jest.spyOn(jobCatFormService, 'getJobCat').mockReturnValue(jobCat);
      jest.spyOn(jobCatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobCat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobCat }));
      saveSubject.complete();

      // THEN
      expect(jobCatFormService.getJobCat).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(jobCatService.update).toHaveBeenCalledWith(expect.objectContaining(jobCat));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobCat>>();
      const jobCat = { id: 123 };
      jest.spyOn(jobCatFormService, 'getJobCat').mockReturnValue({ id: null });
      jest.spyOn(jobCatService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobCat: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobCat }));
      saveSubject.complete();

      // THEN
      expect(jobCatFormService.getJobCat).toHaveBeenCalled();
      expect(jobCatService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobCat>>();
      const jobCat = { id: 123 };
      jest.spyOn(jobCatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobCat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jobCatService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
