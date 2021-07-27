import {TestBed} from '@angular/core/testing';

import {UsOaEstTempService} from './us-oa-est-temp.service';

describe('UsOaEstTempService', () => {
  let service: UsOaEstTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsOaEstTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
