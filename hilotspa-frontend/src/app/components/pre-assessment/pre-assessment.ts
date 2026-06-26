import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BodyMapComponent,
  MarkedRegion
} from '../body-map/body-map';

import { PatientIntakeService } from '../../services/patient-intake';

const COMPLAINT_OPTIONS = [
  'Neck Pain',
  'Shoulder Pain',
  'Upper Back Pain',
  'Lower Back Pain',
  'Elbow Pain',
  'Wrist Pain',
  'Hip Joint Pain',
  'Knee Pain',
  'Ankle Pain',
  'Stiff Neck',
  'Frozen Shoulder',
  'Sciatica',
  'Scoliosis',
  'Osteoarthritis',
  'Spondylosis',
  'Disc Bulge',
  'Slip Disc',
  'DDD',
  'Disc Desiccation',
  'Stenosis',
  'Plantar Fasciitis',
  'Radiculopathy',
  'CTS',
  'TMJ Disorder',
  'Others'
];

@Component({
  selector: 'app-pre-assessment',
  standalone: true,
  imports: [
    CommonModule,
    BodyMapComponent
  ],
  templateUrl: './pre-assessment.html'
})
export class PreAssessmentComponent {

  step: 1 | 2 | 3 = 1;

  complaintOptions = COMPLAINT_OPTIONS;

  markedRegions: MarkedRegion[] = [];

  selectedComplaints: string[] = [];

  submitting = false;

  submitSuccess = false;

  constructor(
    private patientIntakeService: PatientIntakeService
  ) {}

  onRegionsChanged(regions: MarkedRegion[]) {

    this.markedRegions = regions;

  }

  toggleComplaint(complaint: string) {

    const index =
      this.selectedComplaints.indexOf(complaint);

    if (index === -1) {

      this.selectedComplaints.push(complaint);

    } else {

      this.selectedComplaints.splice(index, 1);

    }

  }

  isSelected(complaint: string): boolean {

    return this.selectedComplaints.includes(
      complaint
    );

  }

  goNext() {

    if (this.step === 1) {

      if (this.markedRegions.length === 0) {

        alert('Please select at least one pain area.');

        return;

      }

      this.step = 2;

      return;

    }

    if (this.step === 2) {

      if (this.selectedComplaints.length === 0) {

        alert('Please select at least one complaint.');

        return;

      }

      this.step = 3;

    }

  }

  goBack() {

    if (this.step > 1) {

      this.step = (this.step - 1) as 1 | 2 | 3;

    }

  }

  submit() {

    this.submitting = true;

    let saved = 0;

    this.markedRegions.forEach(region => {

      this.patientIntakeService
        .savePainPoint({

          anatomicalRegion: region.anatomicalRegion,

          coordinateX: region.coordinateX,

          coordinateY: region.coordinateY,

          painScore: region.painScore,

          complaintType:
            this.selectedComplaints.join(', ')

        })
        .subscribe({

          next: () => {

            saved++;

            if (saved === this.markedRegions.length) {

              this.submitting = false;

              this.submitSuccess = true;

            }

          },

          error: (err) => {

            console.error(err);

            this.submitting = false;

          }

        });

    });

  }

}