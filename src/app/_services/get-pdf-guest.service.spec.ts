import {TestBed} from '@angular/core/testing';

import {GetPdfGuestService} from './get-pdf-guest.service';

describe('GetPdfGuestService', () => {
  let service: GetPdfGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPdfGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
