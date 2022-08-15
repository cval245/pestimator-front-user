import {TestBed} from '@angular/core/testing';

import {LawFirmAuthorizedService} from './law-firm-authorized.service';

describe('LawFirmAuthorizedService', () => {
  let service: LawFirmAuthorizedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawFirmAuthorizedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
