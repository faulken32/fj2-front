import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobCatDetailComponent } from './job-cat-detail.component';

describe('JobCat Management Detail Component', () => {
  let comp: JobCatDetailComponent;
  let fixture: ComponentFixture<JobCatDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobCatDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ jobCat: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(JobCatDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(JobCatDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load jobCat on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.jobCat).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
