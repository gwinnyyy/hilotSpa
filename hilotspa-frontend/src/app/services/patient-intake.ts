import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PainPoint {
  anatomicalRegion: string;
  coordinateX: number;
  coordinateY: number;
  painScore: number;
  complaintType: string;
}

@Injectable({ providedIn: 'root' })
export class PatientIntakeService {
  private apiUrl = `${environment.apiUrl}/patient-intake`;

  constructor(private http: HttpClient) {}

  savePainPoint(data: PainPoint): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}