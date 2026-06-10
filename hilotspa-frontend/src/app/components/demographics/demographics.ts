import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demographics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './demographics.html'
})
export class DemographicsComponent {

  demoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.demoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      status: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      birthDate: ['', Validators.required]
    });

  }

  onSubmit() {

    if (this.demoForm.invalid) {
      alert('Please complete all fields.');
      return;
    }

    console.log(this.demoForm.value);

    this.router.navigate(['/assessment']);
  }

}