import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobCat } from '../job-cat.model';

@Component({
  selector: 'jhi-job-cat-detail',
  templateUrl: './job-cat-detail.component.html',
})
export class JobCatDetailComponent implements OnInit {
  jobCat: IJobCat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobCat }) => {
      this.jobCat = jobCat;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
