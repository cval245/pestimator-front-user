import { TestBed } from '@angular/core/testing';

import { FamEstService } from './fam-est.service';

describe('FamEstService', () => {
  let service: FamEstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamEstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
