import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAssessment } from './pre-assessment';

describe('PreAssessment', () => {
  let component: PreAssessment;
  let fixture: ComponentFixture<PreAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreAssessment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreAssessment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
