import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICandidatePreference } from '../candidate-preference.model';

@Component({
  selector: 'jhi-candidate-preference-detail',
  templateUrl: './candidate-preference-detail.component.html',
})
export class CandidatePreferenceDetailComponent implements OnInit {
  candidatePreference: ICandidatePreference | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidatePreference }) => {
      this.candidatePreference = candidatePreference;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
