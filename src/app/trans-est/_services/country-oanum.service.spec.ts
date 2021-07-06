import { TestBed } from '@angular/core/testing';

import { CountryOanumService } from './country-oanum.service';

describe('CountryOanumService', () => {
  let service: CountryOanumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryOanumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
