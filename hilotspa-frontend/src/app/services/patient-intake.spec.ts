import { TestBed } from '@angular/core/testing';

import { PatientIntake } from './patient-intake';

describe('PatientIntake', () => {
  let service: PatientIntake;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientIntake);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
