import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CvDetailComponent } from './cv-detail.component';

describe('Cv Management Detail Component', () => {
  let comp: CvDetailComponent;
  let fixture: ComponentFixture<CvDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cv: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CvDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CvDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cv on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cv).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
