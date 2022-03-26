import {TestBed} from '@angular/core/testing';

import {FamEstDetailGuestService} from './fam-est-detail-guest.service';

describe('FamEstDetailGuestService', () => {
  let service: FamEstDetailGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamEstDetailGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
