import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicsComponent } from './demographics';

describe('Demographics', () => {
  let component: DemographicsComponent;
  let fixture: ComponentFixture<DemographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemographicsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemographicsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
