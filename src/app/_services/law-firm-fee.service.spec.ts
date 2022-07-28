import {TestBed} from '@angular/core/testing';

import {LawFirmFeeService} from './law-firm-fee.service';

describe('LawFirmFeeService', () => {
  let service: LawFirmFeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawFirmFeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
