import {TestBed} from '@angular/core/testing';

import {LawFirmService} from './law-firm.service';

describe('LawFirmService', () => {
  let service: LawFirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawFirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
