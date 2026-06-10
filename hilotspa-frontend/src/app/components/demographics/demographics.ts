import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemographicsService } from '../../services/demographics';

@Component({
  selector: 'app-demographics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './demographics.html'
})
export class DemographicsComponent {
  demoForm: FormGroup;
  submissionStatus: string = '';

  constructor(private fb: FormBuilder, private demoService: DemographicsService) {
    // This matches the Payload interface we built in the service
    this.demoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      sex: ['', Validators.required],
      status: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.demoForm.valid) {
      this.demoService.saveDemographics(this.demoForm.value).subscribe({
        next: (response) => {
          this.submissionStatus = 'Patient demographics saved successfully!';
          this.demoForm.reset();
        },
        error: (error) => {
          console.error('Error saving data', error);
          this.submissionStatus = 'Failed to save data. Check console.';
        }
      });
    } else {
      this.submissionStatus = 'Please fill out all required fields.';
    }
  }
}