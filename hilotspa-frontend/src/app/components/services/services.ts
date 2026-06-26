import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import {
  BookingService,
  SpaService
} from '../../services/booking';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent {

  services: SpaService[] = [

    {
      id: 1,
      name: 'Traditional Hilot',
      duration: 60,
      price: 700,
      description:
        'Traditional Filipino therapeutic massage that relieves muscle tension and promotes holistic healing.'
    },

    {
      id: 2,
      name: 'Swedish Massage',
      duration: 90,
      price: 900,
      description:
        'Gentle full-body massage focused on relaxation, circulation, and stress relief.'
    },

    {
      id: 3,
      name: 'Ventosa Therapy',
      duration: 45,
      price: 650,
      description:
        'Traditional cupping therapy that improves blood circulation and reduces body pain.'
    },

    {
      id: 4,
      name: 'Hot Stone Massage',
      duration: 90,
      price: 1100,
      description:
        'Heated stones combined with massage techniques to ease deep muscle stiffness and improve relaxation.'
    }

  ];

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}

  beginAssessment(service: SpaService) {

    this.bookingService.setSelectedService(service);

    this.router.navigate(['/assessment']);

  }

}