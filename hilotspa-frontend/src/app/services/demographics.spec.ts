import { TestBed } from '@angular/core/testing';

import { Demographics } from './demographics';

describe('Demographics', () => {
  let service: Demographics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Demographics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
