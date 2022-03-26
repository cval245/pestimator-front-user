import {TestBed} from '@angular/core/testing';

import {GetXlsGuestService} from './get-xls-guest.service';

describe('GetXlsGuestService', () => {
  let service: GetXlsGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetXlsGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
