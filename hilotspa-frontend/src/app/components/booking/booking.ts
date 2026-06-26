import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import {
  BookingService,
  SpaService
} from '../../services/booking';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class BookingComponent {

  selectedService?: SpaService;

  selectedTime = '';

  availableTimes = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM'
  ];

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {

    this.selectedService =
      this.bookingService.getSelectedService();

  }

  selectTime(time: string) {

    this.selectedTime = time;

  }

  goBack() {

    this.router.navigate(['/assessment']);

  }

  confirmBooking() {

    if (!this.selectedTime) {

      alert('Please select an appointment time.');

      return;

    }

    this.router.navigate(['/booking-summary']);

  }

}