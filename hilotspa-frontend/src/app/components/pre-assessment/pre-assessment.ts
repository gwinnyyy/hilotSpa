import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyMapComponent, MarkedRegion } from '../body-map/body-map';
import { PatientIntakeService } from '../../services/patient-intake';
import { DemographicsService } from '../../services/demographics';

const COMPLAINT_OPTIONS = [
  'Neck Pain','Shoulder Pain','Upper Back Pain','Lower Back Pain',
  'Elbow Pain','Wrist Pain','Hip Joint Pain','Knee Pain','Ankle Pain',
  'Stiff Neck','Frozen Shoulder','Sciatica','Scoliosis','Osteoarthritis',
  'Spondylosis','Disc Bulge','Slip Disc','DDD','Disc Desiccation',
  'Stenosis','Plantar Fasciitis','Radiculopathy','CTS','TMJ Disorder','Others'
];

@Component({
  selector: 'app-pre-assessment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BodyMapComponent],
  templateUrl: './pre-assessment.html'
})
export class PreAssessmentComponent {
  step: 1 | 2 | 3 = 1;
  complaintOptions = COMPLAINT_OPTIONS;
  markedRegions: MarkedRegion[] = [];
  selectedComplaints: string[] = [];
  submitting = false;
  submitSuccess = false;
  demoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientIntakeService: PatientIntakeService,
    private demographicsService: DemographicsService
  ) {
    this.demoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      age:       ['', [Validators.required, Validators.min(1)]],
      sex:       ['', Validators.required],
      status:    ['', Validators.required],
      height:    ['', Validators.required],
      weight:    ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  onRegionsChanged(regions: MarkedRegion[]) {
    this.markedRegions = regions;
  }

  toggleComplaint(c: string) {
    const i = this.selectedComplaints.indexOf(c);
    if (i === -1) this.selectedComplaints.push(c);
    else this.selectedComplaints.splice(i, 1);
  }

  isSelected(c: string): boolean {
    return this.selectedComplaints.includes(c);
  }

  goNext() {
    if (this.step === 1 && this.demoForm.valid) this.step = 2;
    else if (this.step === 2 && this.markedRegions.length > 0) this.step = 3;
  }

  goBack() {
    if (this.step > 1) this.step = (this.step - 1) as 1 | 2 | 3;
  }

  async submit() {
    if (this.markedRegions.length === 0) return;
    this.submitting = true;
    
    this.demographicsService.saveDemographics(this.demoForm.value).subscribe({
      next: () => {
        let saved = 0;
        this.markedRegions.forEach(region => {
          this.patientIntakeService.savePainPoint({
            anatomicalRegion: region.anatomicalRegion,
            coordinateX: region.coordinateX,
            coordinateY: region.coordinateY,
            painScore: region.painScore,
            complaintType: this.selectedComplaints.join(', ')
          }).subscribe({
            next: () => {
              saved++;
              if (saved === this.markedRegions.length) {
                this.submitting = false;
                this.submitSuccess = true;
              }
            },
            error: (e: any) => { console.error(e); this.submitting = false; }
          });
        });
      },
      error: (e: any) => { console.error(e); this.submitting = false; }
    });
  }
}