import {TestBed} from '@angular/core/testing';

import {DocFormatCountryServiceService} from './doc-format-country.service';

describe('DocFormatCountryServiceService', () => {
  let service: DocFormatCountryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocFormatCountryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
