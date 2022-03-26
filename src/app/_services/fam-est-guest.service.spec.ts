import {TestBed} from '@angular/core/testing';

import {FamEstGuestService} from './fam-est-guest.service';

describe('FamEstGuestService', () => {
  let service: FamEstGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamEstGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
