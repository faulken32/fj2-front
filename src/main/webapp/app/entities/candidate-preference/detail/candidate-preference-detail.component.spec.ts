import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CandidatePreferenceDetailComponent } from './candidate-preference-detail.component';

describe('CandidatePreference Management Detail Component', () => {
  let comp: CandidatePreferenceDetailComponent;
  let fixture: ComponentFixture<CandidatePreferenceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatePreferenceDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ candidatePreference: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CandidatePreferenceDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CandidatePreferenceDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load candidatePreference on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.candidatePreference).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
