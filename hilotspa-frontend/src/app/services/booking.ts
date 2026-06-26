import { Injectable } from '@angular/core';

export interface SpaService {

  id: number;

  name: string;

  duration: number;

  price: number;

  description: string;

}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private selectedService?: SpaService;

  setSelectedService(service: SpaService) {

    this.selectedService = service;

  }

  getSelectedService(): SpaService | undefined {

    return this.selectedService;

  }

  clear() {

    this.selectedService = undefined;

  }

}