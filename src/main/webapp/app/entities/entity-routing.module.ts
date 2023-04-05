import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'application',
        data: { pageTitle: 'flashJobsApp.application.home.title' },
        loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
      },
      {
        path: 'candidate',
        data: { pageTitle: 'flashJobsApp.candidate.home.title' },
        loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule),
      },
      {
        path: 'country',
        data: { pageTitle: 'flashJobsApp.country.home.title' },
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
      },
      {
        path: 'address',
        data: { pageTitle: 'flashJobsApp.address.home.title' },
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
      },
      {
        path: 'candidate-preference',
        data: { pageTitle: 'flashJobsApp.candidatePreference.home.title' },
        loadChildren: () => import('./candidate-preference/candidate-preference.module').then(m => m.CandidatePreferenceModule),
      },
      {
        path: 'candidate-disponibility',
        data: { pageTitle: 'flashJobsApp.candidateDisponibility.home.title' },
        loadChildren: () => import('./candidate-disponibility/candidate-disponibility.module').then(m => m.CandidateDisponibilityModule),
      },
      {
        path: 'compagny',
        data: { pageTitle: 'flashJobsApp.compagny.home.title' },
        loadChildren: () => import('./compagny/compagny.module').then(m => m.CompagnyModule),
      },
      {
        path: 'cv',
        data: { pageTitle: 'flashJobsApp.cv.home.title' },
        loadChildren: () => import('./cv/cv.module').then(m => m.CvModule),
      },
      {
        path: 'job',
        data: { pageTitle: 'flashJobsApp.job.home.title' },
        loadChildren: () => import('./job/job.module').then(m => m.JobModule),
      },
      {
        path: 'job-cat',
        data: { pageTitle: 'flashJobsApp.jobCat.home.title' },
        loadChildren: () => import('./job-cat/job-cat.module').then(m => m.JobCatModule),
      },
      {
        path: 'job-sub-cat',
        data: { pageTitle: 'flashJobsApp.jobSubCat.home.title' },
        loadChildren: () => import('./job-sub-cat/job-sub-cat.module').then(m => m.JobSubCatModule),
      },
      {
        path: 'contact',
        data: { pageTitle: 'flashJobsApp.contact.home.title' },
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
