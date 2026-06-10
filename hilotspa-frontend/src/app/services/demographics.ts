import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as devEnv from '../../environments/environment.development';
import * as prodEnv from '../../environments/environment';

// This forces TypeScript to read the environment variables regardless of compilation mode
const environment = (devEnv.environment && Object.keys(devEnv.environment).length > 0) 
  ? devEnv.environment 
  : (prodEnv as any).environment;
  
export interface DemographicsPayload {
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  status: string;
  height: number;
  weight: number;
  birthDate: string; // Format: YYYY-MM-DD
}

@Injectable({
  providedIn: 'root'
})
export class DemographicsService {
  
  private apiUrl = `${environment.apiUrl}/demographics`;

  constructor(private http: HttpClient) { }

  // Method to push patient data to PostgreSQL database
  saveDemographics(data: DemographicsPayload): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Method to fetch patient demographics by their ID
  getDemographicsById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}