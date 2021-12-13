import {TestBed} from '@angular/core/testing';

import {GetXLSService} from './get-xls.service';

describe('GetXLSService', () => {
  let service: GetXLSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetXLSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
