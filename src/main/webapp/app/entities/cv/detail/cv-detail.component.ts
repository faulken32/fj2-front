import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICv } from '../cv.model';

@Component({
  selector: 'jhi-cv-detail',
  templateUrl: './cv-detail.component.html',
})
export class CvDetailComponent implements OnInit {
  cv: ICv | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cv }) => {
      this.cv = cv;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
