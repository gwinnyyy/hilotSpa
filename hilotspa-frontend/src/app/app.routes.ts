import { Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing';
import { LoginComponent } from './components/login/login';
import { DemographicsComponent } from './components/demographics/demographics';
import { PreAssessmentComponent } from './components/pre-assessment/pre-assessment';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: DemographicsComponent },
  { path: 'assessment', component: PreAssessmentComponent },
];

console.log('ROUTES:', routes);