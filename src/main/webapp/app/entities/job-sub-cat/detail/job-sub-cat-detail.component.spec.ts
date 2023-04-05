import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobSubCatDetailComponent } from './job-sub-cat-detail.component';

describe('JobSubCat Management Detail Component', () => {
  let comp: JobSubCatDetailComponent;
  let fixture: ComponentFixture<JobSubCatDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobSubCatDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ jobSubCat: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(JobSubCatDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(JobSubCatDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load jobSubCat on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.jobSubCat).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
