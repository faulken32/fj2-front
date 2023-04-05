import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompagny } from '../compagny.model';

@Component({
  selector: 'jhi-compagny-detail',
  templateUrl: './compagny-detail.component.html',
})
export class CompagnyDetailComponent implements OnInit {
  compagny: ICompagny | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compagny }) => {
      this.compagny = compagny;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
