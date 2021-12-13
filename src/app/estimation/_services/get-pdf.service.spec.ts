import {TestBed} from '@angular/core/testing';

import {GetPDFService} from './get-pdf.service';

describe('GetPDFService', () => {
  let service: GetPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
