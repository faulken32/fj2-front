import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICandidateDisponibility } from '../candidate-disponibility.model';

@Component({
  selector: 'jhi-candidate-disponibility-detail',
  templateUrl: './candidate-disponibility-detail.component.html',
})
export class CandidateDisponibilityDetailComponent implements OnInit {
  candidateDisponibility: ICandidateDisponibility | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidateDisponibility }) => {
      this.candidateDisponibility = candidateDisponibility;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
