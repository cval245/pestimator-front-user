import {TestBed} from '@angular/core/testing';

import {LawFirmTempService} from './law-firm-temp.service';

describe('LawFirmTempService', () => {
  let service: LawFirmTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawFirmTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
