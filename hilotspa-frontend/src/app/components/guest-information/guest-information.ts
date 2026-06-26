import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-guest-information',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './guest-information.html',
  styleUrls: ['./guest-information.css']
})
export class GuestInformationComponent {

  demoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.demoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

  }

  onSubmit(): void {

    if (this.demoForm.invalid) {
      alert('Please complete all fields.');
      return;
    }

    const password = this.demoForm.value.password;
    const confirmPassword = this.demoForm.value.confirmPassword;

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    console.log(this.demoForm.value);

    this.router.navigate(['/assessment']);
  }

}