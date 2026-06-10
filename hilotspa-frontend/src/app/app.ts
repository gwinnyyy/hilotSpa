import { Component } from '@angular/core';
import { PreAssessmentComponent } from './components/pre-assessment/pre-assessment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PreAssessmentComponent],
  templateUrl: './app.html',
})
export class AppComponent {}