import { Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing';
import { LoginComponent } from './components/login/login';
import { GuestInformationComponent } from './components/guest-information/guest-information';
import { ServicesComponent } from './components/services/services';
import { PreAssessmentComponent } from './components/pre-assessment/pre-assessment';

import { BookingComponent } from './components/booking/booking';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: GuestInformationComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'assessment', component: PreAssessmentComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'booking-summary', component: BookingSummaryComponent },
  { path: 'staff', component: StaffDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: '' }
];

