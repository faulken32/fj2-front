import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CompagnyDetailComponent } from './compagny-detail.component';

describe('Compagny Management Detail Component', () => {
  let comp: CompagnyDetailComponent;
  let fixture: ComponentFixture<CompagnyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompagnyDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ compagny: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CompagnyDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CompagnyDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load compagny on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.compagny).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
