import {TestBed} from '@angular/core/testing';

import {BaseEstTempService} from './base-est-temp.service';

describe('BaseEstTempService', () => {
  let service: BaseEstTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseEstTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
