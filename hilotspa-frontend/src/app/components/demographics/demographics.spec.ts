import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Demographics } from './demographics';

describe('Demographics', () => {
  let component: Demographics;
  let fixture: ComponentFixture<Demographics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Demographics],
    }).compileComponents();

    fixture = TestBed.createComponent(Demographics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
