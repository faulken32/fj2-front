import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobSubCat } from '../job-sub-cat.model';

@Component({
  selector: 'jhi-job-sub-cat-detail',
  templateUrl: './job-sub-cat-detail.component.html',
})
export class JobSubCatDetailComponent implements OnInit {
  jobSubCat: IJobSubCat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobSubCat }) => {
      this.jobSubCat = jobSubCat;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
