import {TestBed} from '@angular/core/testing';

import {CountryAllService} from './country-all.service';

describe('CountryAllService', () => {
  let service: CountryAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
