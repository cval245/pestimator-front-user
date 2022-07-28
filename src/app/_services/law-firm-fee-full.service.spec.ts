import {TestBed} from '@angular/core/testing';

import {LawFirmFeeFullService} from './law-firm-fee-full.service';

describe('LawFirmFeeFullService', () => {
  let service: LawFirmFeeFullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawFirmFeeFullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
