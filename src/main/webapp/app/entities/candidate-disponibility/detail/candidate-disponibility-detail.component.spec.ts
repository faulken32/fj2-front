import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CandidateDisponibilityDetailComponent } from './candidate-disponibility-detail.component';

describe('CandidateDisponibility Management Detail Component', () => {
  let comp: CandidateDisponibilityDetailComponent;
  let fixture: ComponentFixture<CandidateDisponibilityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateDisponibilityDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ candidateDisponibility: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CandidateDisponibilityDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CandidateDisponibilityDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load candidateDisponibility on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.candidateDisponibility).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
