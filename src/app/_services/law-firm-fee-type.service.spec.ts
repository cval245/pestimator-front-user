import {TestBed} from '@angular/core/testing';

import {LawFirmFeeTypeService} from './law-firm-fee-type.service';

describe('LawFirmFeeTypeService', () => {
  let service: LawFirmFeeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawFirmFeeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
